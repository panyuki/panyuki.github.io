// 技能条动画
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// 监听滚动事件，当技能部分进入视口时触发动画
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// 观察技能部分
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    // 更新导航栏活动状态
    updateActiveNavLink();
    
    // 添加滚动效果
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 更新导航栏活动状态
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 导航链接点击事件，添加平滑滚动
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 时间轴滚动动画
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// 观察时间轴项
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// 核心产品能力雷达图
function initRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['战略规划', '解决方案', '需求分析', '项目管理', '资源整合'],
            datasets: [{
                label: '核心产品能力',
                data: [88, 90, 88, 95, 88],
                backgroundColor: 'rgba(0, 122, 255, 0.2)',
                borderColor: 'rgba(0, 122, 255, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 122, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 122, 255, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        color: 'rgba(29, 29, 31, 0.7)',
                        font: {
                            family: '-apple-system, BlinkMacSystemFont, Inter, sans-serif',
                            size: 12
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            family: '-apple-system, BlinkMacSystemFont, Inter, sans-serif',
                            weight: '500'
                        },
                        color: 'rgba(29, 29, 31, 0.9)'
                    },
                    grid: {
                        color: 'rgba(29, 29, 31, 0.05)'
                    },
                    angleLines: {
                        color: 'rgba(29, 29, 31, 0.05)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            elements: {
                line: {
                    tension: 0.2
                }
            }
        }
    });
}

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
    // 初始化页面
    console.log('个人简历网站加载完成');
    
    // 初始化核心产品能力雷达图
    if (document.getElementById('radarChart')) {
        initRadarChart();
    }
    
    // 初始化滚动滑入效果
    initScrollAnimation();
});

// 滚动滑入效果
function initScrollAnimation() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}