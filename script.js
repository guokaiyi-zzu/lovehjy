document.addEventListener('DOMContentLoaded', function () {
    const words = document.querySelectorAll('.heart span');
    const container = document.querySelector('.heart');

    function updatePositions() {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        const scale = Math.min(width, height) / 1; // 根据容器大小调整比例

        let frame = 0; // 帧计数器

        function animate() {
            words.forEach((word, index) => {
                // 动态更新每个单词的角度
                const dynamicAngle = (index / words.length) * Math.PI * 2 + frame * 0.002; // 每帧旋转的角度减小，减慢速度
                // 心形公式计算X和Y
                const x = 16 * Math.pow(Math.sin(dynamicAngle), 3);
                const y = -(13 * Math.cos(dynamicAngle) - 5 * Math.cos(2 * dynamicAngle) - 2 * Math.cos(3 * dynamicAngle) - Math.cos(4 * dynamicAngle));
                
                // 应用缩放和转换
                word.style.left = `${centerX + x * scale}px`;
                word.style.top = `${centerY + y * scale}px`;
                word.style.transform = `translate(-50%, -50%) rotate(${-20}deg)`; // 保持旋转角度为-20度
                word.style.position = 'absolute';

                // 检查文本是否是中文的“我爱你”，如果是，则设置为白色
                if (word.textContent === "我爱你" || word.textContent === "我愛你") {
                    word.style.color = 'white';
                }
            });

            frame++; // 增加帧计数器
            requestAnimationFrame(animate); // 递归调用自身以创建连续动画
        }

        animate(); // 启动动画
    }

    updatePositions();
    window.addEventListener('resize', updatePositions); // 窗口大小调整时更新位置
});
