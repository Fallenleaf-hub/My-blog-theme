/* ============================================================
 * LeafBlog 公共脚本 (index.html 与 article.html 共享)
 * 包含: Toast 提示 / 邮箱复制 / Jelly 果冻动画 / About 弹窗 /
 *       粒子跟随鼠标特效 (页面隐藏时暂停, 触屏/减少动效时禁用)
 * ============================================================ */

function showToast(message) {
    var toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(255, 255, 255, 0.2)';
    toast.style.backdropFilter = 'blur(10px)';
    toast.style.webkitBackdropFilter = 'blur(10px)';
    toast.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    toast.style.color = 'var(--text-primary)';
    toast.style.padding = '10px 24px';
    toast.style.borderRadius = '30px';
    toast.style.zIndex = '99999';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '500';
    toast.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    document.body.appendChild(toast);

    setTimeout(function() {
        toast.style.opacity = '1';
        toast.style.top = '40px';
    }, 10);

    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.top = '20px';
        setTimeout(function() {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

function copyEmail(e, email) {
    e.preventDefault();
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(function() {
            showToast('邮箱已复制');
        });
    } else {
        var textArea = document.createElement("textarea");
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
        showToast('邮箱已复制');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // 果冻跳动动画的事件委托 (合并两页选择器)
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.logo-icon, .card-icon, .about-avatar, .category-btn, .tag-pill, .category-tag, .nav-card');
        if (target) {
            target.classList.remove('jelly-active');
            void target.offsetWidth; // 触发重绘
            target.classList.add('jelly-active');

            setTimeout(() => {
                target.classList.remove('jelly-active');
            }, 600);
        }
    });

    // 个人简介弹窗逻辑
    const aboutNavLink = document.getElementById('aboutNavLink');
    const aboutModal = document.getElementById('aboutModal');
    const aboutCloseBtn = document.getElementById('aboutCloseBtn');

    if (aboutNavLink && aboutModal) {
        aboutNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            aboutModal.classList.add('active');
        });
    }

    if (aboutCloseBtn && aboutModal) {
        aboutCloseBtn.addEventListener('click', () => {
            aboutModal.classList.remove('active');
        });
    }

    if (aboutModal) {
        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.remove('active');
            }
        });
    }
});

/* ==================== 粒子跟随鼠标特效 ==================== */
(function() {
    // 触屏设备或用户偏好减少动效时直接禁用, 节省性能
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (reducedMotion || isTouch) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'mouse-particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const colors = [
        'rgba(66, 133, 244, 0.45)',  // Google Blue (柔和半透)
        'rgba(219, 68, 55, 0.45)',  // Google Red
        'rgba(244, 180, 0, 0.45)',  // Google Yellow
        'rgba(15, 157, 88, 0.45)'   // Google Green
    ];

    const mouse = { x: -1000, y: -1000, active: false };
    const lastMouse = { x: null, y: null };

    // 动画帧控制: 页面隐藏时暂停 requestAnimationFrame
    let rafId = null;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // 线性插值生成粒子，使快速移动时粒子流连贯无断裂
    function createInterpolatedParticles(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 仅当发生有效位移时生成，每7像素插值一个，上限15个，保证极简柔顺
        const steps = Math.min(15, Math.floor(distance / 7));

        for (let i = 0; i <= steps; i++) {
            const t = steps === 0 ? 1 : i / steps;
            const px = x1 + dx * t;
            const py = y1 + dy * t;
            particles.push(new Particle(px, py));
        }
    }

    window.addEventListener('mousemove', (e) => {
        const currentX = e.clientX;
        const currentY = e.clientY;
        mouse.x = currentX;
        mouse.y = currentY;
        mouse.active = true;

        if (lastMouse.x !== null && lastMouse.y !== null) {
            // 只在发生移动时插值生成粒子
            createInterpolatedParticles(lastMouse.x, lastMouse.y, currentX, currentY);
        } else {
            particles.push(new Particle(currentX, currentY));
        }

        lastMouse.x = currentX;
        lastMouse.y = currentY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.active = false;
        lastMouse.x = null;
        lastMouse.y = null;
    });

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            const angle = Math.random() * Math.PI * 2;
            // 降低粒子喷射速度，使运动看起来更加平稳温柔（流沙质感）
            const speed = Math.random() * 0.7 + 0.15;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;

            // 空气阻力系数与微小重力（更徐缓的向上漂浮感）
            this.friction = 0.95 + Math.random() * 0.02;
            this.gravity = -0.005 - Math.random() * 0.005;

            // 粒子大小更加微细，增强精致感
            this.size = Math.random() * 2.5 + 1.2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = 0.5 + Math.random() * 0.3; // 降低初始透明度，视觉上更轻透

            // 降低消亡速率，使粒子消失的过程更加丝滑徐缓
            this.decay = Math.random() * 0.008 + 0.006;
        }

        update() {
            // 当鼠标在附近时，粒子会受到指向鼠标中心的超柔和引力
            if (mouse.active) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 160 && distance > 5) {
                    // 极轻引力，使粒子以舒缓弧线绕着鼠标旋转包围，不再发生剧烈撞击
                    const force = (160 - distance) / 160 * 0.04;
                    this.vx += (dx / distance) * force;
                    this.vy += (dy / distance) * force;
                }
            }

            // 物理状态更新
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.x += this.vx;
            this.y += this.vy + this.gravity;
            this.alpha -= this.decay;
        }

        draw() {
            if (this.alpha <= 0) return;

            // 粒子面积随着生命周期同步收缩
            const currentSize = Math.max(0.1, this.size * this.alpha);

            ctx.save();
            ctx.globalAlpha = this.alpha;

            // 统一使用带有平滑羽化效果的径向渐变圆形，消除十字星的多余棱角，实现极度柔顺
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentSize);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            if (p.alpha <= 0) {
                particles.splice(i, 1);
            } else {
                p.draw();
            }
        }

        rafId = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (rafId === null) rafId = requestAnimationFrame(animate);
    }

    function stopAnimation() {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }

    // 页面切换至后台时暂停动画, 回到前台时恢复
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAnimation();
        } else {
            startAnimation();
        }
    });

    startAnimation();
})();
