<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import VChart from 'vue-echarts'
import ArrowLeft from 'vue-material-design-icons/ArrowLeft.vue'
import ChartLine from 'vue-material-design-icons/ChartLine.vue'
import GasStation from 'vue-material-design-icons/GasStation.vue'
import EmoticonHappy from 'vue-material-design-icons/EmoticonHappy.vue'
import Tools from 'vue-material-design-icons/Tools.vue'
import TrendingUp from 'vue-material-design-icons/TrendingUp.vue'
import TrendingDown from 'vue-material-design-icons/TrendingDown.vue'
import FileDownload from 'vue-material-design-icons/FileDownload.vue'

const router = useRouter()

const goBack = () => {
  router.back()
}

const detailedStats = ref({
  monthlyTrips: [450, 520, 480, 610, 580, 630, 590, 650, 620, 580, 610, 680],
  fuelConsumption: [1200, 1150, 1180, 1250, 1220, 1280, 1240, 1300, 1270, 1230, 1260, 1320],
  studentSatisfaction: [4.2, 4.5, 4.3, 4.6, 4.4, 4.7, 4.5, 4.8, 4.6, 4.7, 4.5, 4.9],
  maintenanceCosts: [8500, 9200, 7800, 10500, 8800, 9600, 8200, 11000, 9400, 8700, 9900, 11200]
})

// KPIs calculados
const kpis = ref({
  totalTrips: 0,
  avgFuel: 0,
  avgSatisfaction: 0,
  totalMaintenance: 0,
  tripsTrend: 0,
  fuelTrend: 0,
  satisfactionTrend: 0,
  maintenanceTrend: 0
})

const detailedOption1 = ref({})
const detailedOption2 = ref({})
const detailedOption3 = ref({})
const detailedOption4 = ref({})

const exportReport = () => {
  alert('Relatório exportado com sucesso!')
}

onMounted(() => {
  // Calcular KPIs
  const trips = detailedStats.value.monthlyTrips
  const fuel = detailedStats.value.fuelConsumption
  const satisfaction = detailedStats.value.studentSatisfaction
  const maintenance = detailedStats.value.maintenanceCosts

  kpis.value.totalTrips = trips.reduce((a, b) => a + b, 0)
  kpis.value.avgFuel = Math.round(fuel.reduce((a, b) => a + b, 0) / fuel.length)
  kpis.value.avgSatisfaction = (satisfaction.reduce((a, b) => a + b, 0) / satisfaction.length).toFixed(1)
  kpis.value.totalMaintenance = maintenance.reduce((a, b) => a + b, 0)

  // Calcular tendências (comparando últimos 3 meses com 3 anteriores)
  const calcTrend = (arr) => {
    const recent = arr.slice(-3).reduce((a, b) => a + b, 0) / 3
    const previous = arr.slice(-6, -3).reduce((a, b) => a + b, 0) / 3
    return ((recent - previous) / previous * 100).toFixed(1)
  }

  kpis.value.tripsTrend = calcTrend(trips)
  kpis.value.fuelTrend = calcTrend(fuel)
  kpis.value.satisfactionTrend = calcTrend(satisfaction)
  kpis.value.maintenanceTrend = calcTrend(maintenance)

  // Gráfico de Viagens Mensais
  detailedOption1.value = {
    title: {
      text: 'Viagens Mensais',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#022840'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#022840',
      borderWidth: 1,
      textStyle: {
        color: '#022840'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: 'Viagens',
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    series: [{
      data: detailedStats.value.monthlyTrips,
      type: 'bar',
      barWidth: '50%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#1a73e8' },
          { offset: 1, color: '#022840' }
        ]),
        borderRadius: [8, 8, 0, 0]
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2196F3' },
            { offset: 1, color: '#1a73e8' }
          ])
        }
      }
    }]
  }

  // Gráfico de Consumo de Combustível
  detailedOption2.value = {
    title: {
      text: 'Consumo de Combustível (L)',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#022840'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#FF9800',
      borderWidth: 1
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: 'Litros',
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    series: [{
      data: detailedStats.value.fuelConsumption,
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#FF9800',
        width: 4
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(255, 152, 0, 0.4)' },
          { offset: 1, color: 'rgba(255, 152, 0, 0.05)' }
        ])
      },
      itemStyle: {
        color: '#FF9800',
        borderWidth: 3,
        borderColor: '#fff'
      },
      symbol: 'circle',
      symbolSize: 8
    }]
  }

  // Gráfico de Satisfação
  detailedOption3.value = {
    title: {
      text: 'Satisfação dos Alunos',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#022840'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#4CAF50',
      borderWidth: 1
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    yAxis: {
      type: 'value',
      min: 4,
      max: 5,
      name: 'Nota',
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    series: [{
      data: detailedStats.value.studentSatisfaction,
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#4CAF50',
        width: 4
      },
      itemStyle: {
        color: '#4CAF50',
        borderWidth: 3,
        borderColor: '#fff'
      },
      symbol: 'circle',
      symbolSize: 8,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(76, 175, 80, 0.3)' },
          { offset: 1, color: 'rgba(76, 175, 80, 0.05)' }
        ])
      }
    }]
  }

  // Gráfico de Custos de Manutenção
  detailedOption4.value = {
    title: {
      text: 'Custos de Manutenção (R$)',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#022840'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#F44336',
      borderWidth: 1,
      formatter: (params) => {
        return `${params[0].name}<br/>${params[0].marker} R$ ${params[0].value.toLocaleString('pt-BR')}`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: 'R$',
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      },
      axisLabel: {
        formatter: (value) => {
          return 'R$ ' + (value / 1000).toFixed(0) + 'k'
        }
      }
    },
    series: [{
      data: detailedStats.value.maintenanceCosts,
      type: 'bar',
      barWidth: '50%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#F44336' },
          { offset: 1, color: '#C62828' }
        ]),
        borderRadius: [8, 8, 0, 0]
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#EF5350' },
            { offset: 1, color: '#F44336' }
          ])
        }
      }
    }]
  }
})
</script>

<template>
  <div class="dashboard-details-premium">
    <!-- Header Premium -->
    <div class="details-header-premium">
      <div class="header-content">
        <button class="back-button" @click="goBack">
          <ArrowLeft :size="24" />
          <span>Voltar</span>
        </button>
        <div class="header-title">
          <ChartLine :size="40" />
          <div>
            <h1>Análise Detalhada</h1>
            <p>Relatórios completos do sistema GoRoutes</p>
          </div>
        </div>
      </div>
      <button class="export-button" @click="exportReport">
        <FileDownload :size="20" />
        <span>Exportar Relatório</span>
      </button>
    </div>

    <!-- KPIs Premium -->
    <div class="kpis-section">
      <div class="kpi-card trips-kpi">
        <div class="kpi-icon">
          <ChartLine :size="32" />
        </div>
        <div class="kpi-content">
          <span class="kpi-label">Total de Viagens</span>
          <span class="kpi-value">{{ kpis.totalTrips.toLocaleString('pt-BR') }}</span>
          <div class="kpi-trend" :class="kpis.tripsTrend > 0 ? 'trend-up' : 'trend-down'">
            <component :is="kpis.tripsTrend > 0 ? TrendingUp : TrendingDown" :size="18" />
            <span>{{ Math.abs(kpis.tripsTrend) }}% vs trimestre anterior</span>
          </div>
        </div>
      </div>

      <div class="kpi-card fuel-kpi">
        <div class="kpi-icon">
          <GasStation :size="32" />
        </div>
        <div class="kpi-content">
          <span class="kpi-label">Consumo Médio</span>
          <span class="kpi-value">{{ kpis.avgFuel.toLocaleString('pt-BR') }}L</span>
          <div class="kpi-trend" :class="kpis.fuelTrend > 0 ? 'trend-down' : 'trend-up'">
            <component :is="kpis.fuelTrend > 0 ? TrendingUp : TrendingDown" :size="18" />
            <span>{{ Math.abs(kpis.fuelTrend) }}% vs trimestre anterior</span>
          </div>
        </div>
      </div>

      <div class="kpi-card satisfaction-kpi">
        <div class="kpi-icon">
          <EmoticonHappy :size="32" />
        </div>
        <div class="kpi-content">
          <span class="kpi-label">Satisfação Média</span>
          <span class="kpi-value">{{ kpis.avgSatisfaction }}/5.0</span>
          <div class="kpi-trend" :class="kpis.satisfactionTrend > 0 ? 'trend-up' : 'trend-down'">
            <component :is="kpis.satisfactionTrend > 0 ? TrendingUp : TrendingDown" :size="18" />
            <span>{{ Math.abs(kpis.satisfactionTrend) }}% vs trimestre anterior</span>
          </div>
        </div>
      </div>

      <div class="kpi-card maintenance-kpi">
        <div class="kpi-icon">
          <Tools :size="32" />
        </div>
        <div class="kpi-content">
          <span class="kpi-label">Custo Total Manutenção</span>
          <span class="kpi-value">R$ {{ (kpis.totalMaintenance / 1000).toFixed(0) }}k</span>
          <div class="kpi-trend" :class="kpis.maintenanceTrend > 0 ? 'trend-down' : 'trend-up'">
            <component :is="kpis.maintenanceTrend > 0 ? TrendingUp : TrendingDown" :size="18" />
            <span>{{ Math.abs(kpis.maintenanceTrend) }}% vs trimestre anterior</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Gráficos Premium -->
    <div class="detailed-charts-premium">
      <div class="chart-container-premium">
        <div class="chart-header-premium">
          <div class="chart-title">
            <ChartLine :size="24" />
            <h3>Viagens Mensais</h3>
          </div>
          <span class="chart-badge">Tendência: +{{ kpis.tripsTrend }}%</span>
        </div>
        <VChart :option="detailedOption1" style="height: 420px;" />
      </div>

      <div class="chart-container-premium">
        <div class="chart-header-premium">
          <div class="chart-title">
            <GasStation :size="24" />
            <h3>Consumo de Combustível</h3>
          </div>
          <span class="chart-badge warning">Consumo: {{ kpis.avgFuel }}L/mês</span>
        </div>
        <VChart :option="detailedOption2" style="height: 420px;" />
      </div>

      <div class="chart-container-premium">
        <div class="chart-header-premium">
          <div class="chart-title">
            <EmoticonHappy :size="24" />
            <h3>Satisfação dos Alunos</h3>
          </div>
          <span class="chart-badge success">Nota: {{ kpis.avgSatisfaction }}/5.0</span>
        </div>
        <VChart :option="detailedOption3" style="height: 420px;" />
      </div>

      <div class="chart-container-premium">
        <div class="chart-header-premium">
          <div class="chart-title">
            <Tools :size="24" />
            <h3>Custos de Manutenção</h3>
          </div>
          <span class="chart-badge danger">Total: R$ {{ (kpis.totalMaintenance / 1000).toFixed(0) }}k</span>
        </div>
        <VChart :option="detailedOption4" style="height: 420px;" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-details-premium {
  --primary: #022840;
  --accent: #1a73e8;
  --gradient-primary: linear-gradient(135deg, #022840, #1a73e8);
  padding: 2rem;
  min-height: 100vh;
  width: 95%;
  margin: 10px auto;
}

/* Header Premium */
.details-header-premium {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.details-header-premium::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: var(--gradient-primary);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, rgba(2, 40, 64, 0.1), rgba(26, 115, 232, 0.1));
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  color: var(--primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.back-button:hover {
  transform: translateX(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  background: var(--gradient-primary);
  color: white;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--primary);
}

.header-title h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.2rem;
}

.header-title p {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
}

.export-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--gradient-primary);
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
}

.export-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(26, 115, 232, 0.4);
}

/* KPIs Premium */
.kpis-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.kpi-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.kpi-card::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  transition: height 0.3s ease;
}

.kpi-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
}

.kpi-card:hover::before {
  height: 6px;
}

.trips-kpi::before {
  background: linear-gradient(90deg, #1a73e8, #2196F3);
}

.fuel-kpi::before {
  background: linear-gradient(90deg, #FF9800, #FFA726);
}

.satisfaction-kpi::before {
  background: linear-gradient(90deg, #4CAF50, #66BB6A);
}

.maintenance-kpi::before {
  background: linear-gradient(90deg, #F44336, #EF5350);
}

.kpi-icon {
  width: 70px;
  height: 70px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.kpi-card:hover .kpi-icon {
  transform: scale(1.1) rotate(-5deg);
}

.trips-kpi .kpi-icon {
  background: linear-gradient(135deg, #1a73e8, #2196F3);
}

.fuel-kpi .kpi-icon {
  background: linear-gradient(135deg, #FF9800, #FFA726);
}

.satisfaction-kpi .kpi-icon {
  background: linear-gradient(135deg, #4CAF50, #66BB6A);
}

.maintenance-kpi .kpi-icon {
  background: linear-gradient(135deg, #F44336, #EF5350);
}

.kpi-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.kpi-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.kpi-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
}

.kpi-trend {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  font-weight: 600;
}

.trend-up {
  color: #4CAF50;
}

.trend-down {
  color: #F44336;
}

/* Gráficos Premium */
.detailed-charts-premium {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
}

.chart-container-premium {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.chart-container-premium::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.chart-container-premium:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.chart-container-premium:hover::before {
  opacity: 1;
}

.chart-header-premium {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.chart-title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--primary);
}

.chart-title h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.chart-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background: linear-gradient(135deg, rgba(26, 115, 232, 0.1), rgba(2, 40, 64, 0.1));
  color: var(--primary);
}

.chart-badge.warning {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 152, 0, 0.2));
  color: #FF9800;
}

.chart-badge.success {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.2));
  color: #4CAF50;
}

.chart-badge.danger {
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(244, 67, 54, 0.2));
  color: #F44336;
}

/* Responsividade */
@media (max-width: 1200px) {
  .detailed-charts-premium {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}

@media (max-width: 768px) {
  .dashboard-details-premium {
    padding: 1rem;
  }

  .details-header-premium {
    flex-direction: column;
    gap: 1.5rem;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .header-title {
    flex-direction: column;
  }

  .header-title h1 {
    font-size: 1.5rem;
  }

  .kpis-section {
    grid-template-columns: 1fr;
  }

  .detailed-charts-premium {
    grid-template-columns: 1fr;
  }

  .kpi-value {
    font-size: 1.5rem;
  }
}

/* Animações */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>