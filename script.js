// デモのステップ制御
let currentStep = 1;
const totalSteps = 3;

// スムーズスクロール関数
function scrollToDemo() {
    document.getElementById('demo').scrollIntoView({
        behavior: 'smooth'
    });
}

// デモの次のステップに進む
function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        updateDemoDisplay();
    }
}

// デモの前のステップに戻る
function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateDemoDisplay();
    }
}

// デモをリセット
function resetDemo() {
    currentStep = 1;
    updateDemoDisplay();
}

// デモ画面の更新
function updateDemoDisplay() {
    // ステップインジケーターの更新
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // デモ画面の切り替え
    const screens = document.querySelectorAll('.demo-screen');
    screens.forEach((screen, index) => {
        if (index + 1 === currentStep) {
            screen.style.display = 'flex';
            screen.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            screen.style.display = 'none';
        }
    });
}


// ステップクリックでデモを切り替え
function handleStepClick(stepNumber) {
    currentStep = stepNumber;
    updateDemoDisplay();
}

// スクロール時のヘッダー処理
function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}

// インタラクティブなチャートアニメーション
function animateCharts() {
    const chartBars = document.querySelectorAll('.bar-after');
    chartBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.animation = 'slideIn 1s ease-out forwards';
        }, index * 200);
    });
}

// スクロールに応じたアニメーション
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .benefit-item, .testimonial-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// セルフィーのシミュレーション
function simulateSelfie() {
    const faceOutline = document.querySelector('.face-outline');
    const cameraPreview = document.querySelector('.camera-preview');
    
    if (faceOutline && cameraPreview) {
        // 顔検出のシミュレーション
        setTimeout(() => {
            faceOutline.style.borderColor = '#27AE60';
            faceOutline.style.animation = 'none';
            
            // "検出完了" メッセージ
            const detectedMsg = document.createElement('div');
            detectedMsg.textContent = '顔を検出しました！';
            detectedMsg.style.cssText = `
                position: absolute;
                bottom: 10px;
                color: #27AE60;
                font-weight: bold;
                font-size: 0.9rem;
            `;
            cameraPreview.appendChild(detectedMsg);
            
            // 3秒後にリセット
            setTimeout(() => {
                faceOutline.style.borderColor = '#4A90E2';
                faceOutline.style.animation = 'pulse 2s infinite';
                if (detectedMsg.parentNode) {
                    detectedMsg.parentNode.removeChild(detectedMsg);
                }
            }, 3000);
        }, 2000);
    }
}

// DOMが読み込まれた後の初期化
document.addEventListener('DOMContentLoaded', function() {

    // ステップクリックのイベントリスナー設定
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.addEventListener('click', () => handleStepClick(index + 1));
    });

    // スクロールイベント
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollAnimations);

    // 初期デモ表示
    updateDemoDisplay();

    // チャートアニメーションの開始（少し遅延）
    setTimeout(animateCharts, 1000);

    // セルフィーシミュレーションの開始
    setTimeout(simulateSelfie, 3000);
    setInterval(simulateSelfie, 10000); // 10秒ごとに繰り返し

    // スムーズスクロールの設定（全てのアンカーリンク）
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// CSSアニメーションの追加
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { width: 0; }
        to { width: 60%; }
    }
    
    .animate {
        animation: fadeIn 0.6s ease-out;
    }
    
    .feature-card, .benefit-item, .testimonial-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .feature-card.animate, .benefit-item.animate, .testimonial-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);