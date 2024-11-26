// 示例团队成员数据
const teamMembers = [
    {
        name: "聪明姐",
        image: "./images/1.png",
        description: "金数据 dev001。",
    },
    {
        name: "琰妹",
        image: "./images/2.png",
        description: "从开发运维，到市场销售，啥都能干。",
    },
    {
        name: "江姐",
        image: "./images/3.png",
        description: "像兵马俑一样可靠",
    },
    {
        name: "燕子哥",
        image: "./images/4.png",
        description: "啥时候要？",
    },
    {
        name: "虫爷",
        image: "./images/5.png",
        description: "别催了，正在部署呢",
    }
];

// 创建社交媒体链接HTML
function createSocialLinks(social) {
    if (!social) return '';

    const icons = {
        linkedin: '<i class="fab fa-linkedin"></i>',
        twitter: '<i class="fab fa-twitter"></i>',
        github: '<i class="fab fa-github"></i>',
        dribbble: '<i class="fab fa-dribbble"></i>'
    };

    return Object.entries(social)
        .map(([platform, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${icons[platform]}</a>`)
        .join('');
}

// 创建团队成员卡片
function createTeamMemberCard(member) {
    const cell = document.createElement('div');
    cell.className = 'honeycomb-cell';

    cell.innerHTML = `
        <img class="honeycomb-cell_img" src="${member.image}" alt="${member.name}">
        <div class="honeycomb-cell_title">
            <h3>${member.name}</h3>
        </div>
        <div class="honeycomb-cell_description">
            <h3>${member.name}</h3>
            <p class="bio">${member.description}</p>
            <div class="social-links">
                ${createSocialLinks(member.social)}
            </div>
        </div>
    `;

    // 添加点击事件处理翻转效果
    cell.addEventListener('click', () => {
        // 移除其他卡片的翻转状态
        document.querySelectorAll('.honeycomb-cell.is-flipped').forEach(flippedCell => {
            if (flippedCell !== cell) {
                flippedCell.classList.remove('is-flipped');
            }
        });

        // 切换当前卡片的翻转状态
        cell.classList.toggle('is-flipped');
    });

    // 点击页面其他地方时关闭详情
    document.addEventListener('click', (event) => {
        if (!cell.contains(event.target) && cell.classList.contains('is-flipped')) {
            cell.classList.remove('is-flipped');
        }
    });

    return cell;
}

// 初始化页面
function initTeamPage() {
    const honeycomb = document.querySelector('.honeycomb');

    // 创建并添加所有团队成员卡片
    teamMembers.forEach(member => {
        const card = createTeamMemberCard(member);
        honeycomb.appendChild(card);
    });

    // 添加一些空的蜂窝单元以保持布局
    const cellsNeeded = Math.ceil(teamMembers.length / 5) * 5;
    const emptyCellsNeeded = cellsNeeded - teamMembers.length;

    for (let i = 0; i < emptyCellsNeeded; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'honeycomb-cell honeycomb-cell--empty';
        honeycomb.appendChild(emptyCell);
    }
}

// 当页面加载完成时初始化
document.addEventListener('DOMContentLoaded', initTeamPage);
