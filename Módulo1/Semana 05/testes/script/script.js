// Variáveis
let score = 0;
let scorePerClick = 1;
let scorePerSecond = 0;
let autoClickerActive = false;
let autoClickerInterval;
let upgradeCounts = {};

// Elementos HTML
const cookieButton = document.getElementById('cookieButton');
const scoreElement = document.getElementById('score');
const scorePerSecondElement = document.getElementById('scorePerSecond');
const upgrades = document.getElementsByClassName('upgrade');

// Atualiza a pontuação exibida
function updateScore() {
  scoreElement.textContent = 'Pontuação: ' + score;
}

// Atualiza a pontuação por segundo exibida
function updateScorePerSecond() {
  scorePerSecondElement.textContent = 'Pontuação por segundo: ' + scorePerSecond;
}

// Atualiza o contador de upgrades comprados
function updateUpgradeCount() {
  for (const upgrade of upgrades) {
    const upgradeId = upgrade.id;
    const countElement = upgrade.querySelector('.upgrade-count');
    countElement.textContent = upgradeCounts[upgradeId] || 0;
  }
}

// Incrementa a pontuação quando o botão é clicado
cookieButton.addEventListener('click', function() {
  score += scorePerClick;
  updateScore();

  // Animação de recuo do cookie
  const cookie = document.querySelector('.cookie');
  cookie.classList.add('clicked');
  setTimeout(function() {
    cookie.classList.remove('clicked');
  }, 200);
});

// Atualiza a pontuação por segundo a cada segundo
setInterval(function() {
  score += scorePerSecond;
  updateScore();
}, 1000);

// Função para comprar um upgrade
function buyUpgrade(upgradeId, upgradeCost, upgradeValue) {
    if (score >= upgradeCost) {
      score -= upgradeCost;
      scorePerClick += upgradeValue;
      upgradeCounts[upgradeId] = (upgradeCounts[upgradeId] || 0) + 1;
      updateScore();
      updateUpgradeCount();
  
      if (upgradeId === 'upgrade3' && !autoClickerActive) {
        autoClickerActive = true;
        autoClickerInterval = setInterval(function() {
          score += scorePerClick;
          updateScore();
        }, 1000);
      }
    }
  }
  

// Botões de upgrade
for (const upgrade of upgrades) {
  const upgradeId = upgrade.id;
  const upgradeCost = parseInt(upgrade.dataset.cost, 10);
  const upgradeValue = parseInt(upgrade.dataset.value, 10);

  upgrade.addEventListener('click', function() {
    buyUpgrade(upgradeId, upgradeCost, upgradeValue);
  });
}

// Ativa o clique automático
const upgrade3Button = document.getElementById('upgrade3');
upgrade3Button.addEventListener('click', function() {
  if (!autoClickerActive && score >= 50) {
    score -= 50;
    autoClickerActive = true;
    autoClickerInterval = setInterval(function() {
      score += scorePerClick;
      updateScore();
    }, 1000);
    upgrade3Button.disabled = true;
    upgradeCounts['upgrade3'] = (upgradeCounts['upgrade3'] || 0) + 1;
    updateUpgradeCount();
  }
});

// Inicializa a pontuação
updateScore();
updateScorePerSecond();
updateUpgradeCount();
