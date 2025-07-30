<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    icon: Object,
    text: String,
    subText: String,
    number: String,
});
</script>

<template>
    <div class="card">
        <div class="card-content">
            <div class="card-left">
                <div class="icon-container">
                    <component :is="icon" class="card-icon" />
                </div>
                <div class="text-content">
                    <h3 class="card-title">{{ text }}</h3>
                    <p class="card-subtitle">{{ subText }}</p>
                </div>
            </div>
            <div class="card-right">
                <span class="card-number">{{ number }}</span>
            </div>
        </div>
        <div class="card-shine"></div>
    </div>
</template>

<style scoped>
.card {
    position: relative;
    border-radius: 16px;
    color: black;
    padding: 24px;
    border: 1px solid var(--primary-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    cursor: pointer;
    min-height: 120px;
    width: 100%;
}

.card:hover {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 
        0 20px 40px rgba(102, 126, 234, 0.4),
        0 8px 25px rgba(0, 0, 0, 0.15);
}

.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 16px;
    pointer-events: none;
}

.card-shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        45deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
    );
    transform: rotate(45deg);
    transition: all 0.6s;
    opacity: 0;
}

.card:hover .card-shine {
    animation: shine 0.6s ease-in-out;
}

@keyframes shine {
    0% {
        transform: translateX(-100%) translateY(-100%) rotate(45deg);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: translateX(100%) translateY(100%) rotate(45deg);
        opacity: 0;
    }
}

.card-content {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}

.card-left {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
}

.icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.card-icon {
    width: 28px;
    height: 28px;
}

.text-content {
    flex: 1;
}

.card-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    margin-bottom: 4px;
    line-height: 1.2;
}

.card-subtitle {
    font-size: 14px;
    margin: 0;
    font-weight: 400;
}

.card-right {
    display: flex;
    align-items: center;
}

.card-number {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.5px;
}

/* Variações de cores */
.card.variant-green {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    box-shadow: 
        0 10px 30px rgba(17, 153, 142, 0.3),
        0 4px 15px rgba(0, 0, 0, 0.1);
}

.card.variant-green:hover {
    box-shadow: 
        0 20px 40px rgba(17, 153, 142, 0.4),
        0 8px 25px rgba(0, 0, 0, 0.15);
}

.card.variant-orange {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    box-shadow: 
        0 10px 30px rgba(250, 112, 154, 0.3),
        0 4px 15px rgba(0, 0, 0, 0.1);
}

.card.variant-orange:hover {
    box-shadow: 
        0 20px 40px rgba(250, 112, 154, 0.4),
        0 8px 25px rgba(0, 0, 0, 0.15);
}

.card.variant-blue {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    box-shadow: 
        0 10px 30px rgba(79, 172, 254, 0.3),
        0 4px 15px rgba(0, 0, 0, 0.1);
}

.card.variant-blue:hover {
    box-shadow: 
        0 20px 40px rgba(79, 172, 254, 0.4),
        0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Responsividade */
@media (max-width: 768px) {
    .card {
        padding: 20px;
        min-height: 100px;
    }
    
    .card-left {
        gap: 12px;
    }
    
    .icon-container {
        width: 48px;
        height: 48px;
    }
    
    .card-icon {
        width: 24px;
        height: 24px;
    }
    
    .card-title {
        font-size: 16px;
    }
    
    .card-subtitle {
        font-size: 13px;
    }
    
    .card-number {
        font-size: 28px;
    }
}

@media (max-width: 480px) {
    .card {
        padding: 16px;
    }
    
    .card-number {
        font-size: 24px;
    }
    
    .card-title {
        font-size: 15px;
    }
}
</style>