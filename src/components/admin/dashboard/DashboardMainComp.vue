<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import VChart from 'vue-echarts'
import Map from 'vue-material-design-icons/Map.vue'
import Bus from 'vue-material-design-icons/Bus.vue'
import AccountGroup from 'vue-material-design-icons/AccountGroup.vue'
import MapMarkerPath from 'vue-material-design-icons/MapMarkerPath.vue'
import Steering from 'vue-material-design-icons/Steering.vue'
import TrendingUp from 'vue-material-design-icons/TrendingUp.vue'
import ArrowRight from 'vue-material-design-icons/ArrowRight.vue'

const router = useRouter()

const vehiclesData = ref({
  total: 15,
  active: 12,
  maintenance: 3,
  types: [
    { value: 8, name: 'Van' },
    { value: 5, name: 'Micro-ônibus' },
    { value: 2, name: 'Ônibus' }
  ]
})

const studentsData = ref({
  total: 245,
  active: 230,
  inactive: 15,
  byPeriod: [
    { period: 'Manhã', count: 120 },
    { period: 'Tarde', count: 80 },
    { period: 'Integral', count: 45 }
  ]
})

const routesData = ref({
  total: 28,
  completed: 22,
  inProgress: 6,
  efficiency: [85, 92, 78, 88, 90, 87, 83, 91, 89, 86, 84, 90]
})

const driversData = ref({
  total: 18,
  active: 15,
  onVacation: 3,
  performance: [4.8, 4.5, 4.9, 4.7, 4.6, 4.8, 4.9, 4.4, 4.7, 4.8, 4.6, 4.9]
})

const maintenanceData = ref({
  pending: 5,
  inProgress: 2,
  completed: 8,
  nextServices: ['ABC-1234', 'DEF-5678', 'GHI-9012']
})

const vehiclesChartOption = ref({})
const studentsChartOption = ref({})
const routesChartOption = ref({})
const driversChartOption = ref({})
const maintenanceChartOption = ref({})
const realTimeMonitoringOption = ref({})

const navigateToDetails = () => {
  router.push('/default/admin/dashboard-details')
}

onMounted(() => {
  vehiclesChartOption.value = {
    title: {
      text: 'Status dos Veículos',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#022840'
      }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#022840',
      borderWidth: 1,
      textStyle: {
        color: '#022840'
      }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      bottom: '10%',
      textStyle: {
        color: '#022840'
      }
    },
    series: [{
      name: 'Veículos',
      type: 'pie',
      radius: ['45%', '75%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 12,
        borderColor: '#fff',
        borderWidth: 3
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        },
        scale: true,
        scaleSize: 10
      },
      labelLine: {
        show: false
      },
      data: [
        { value: vehiclesData.value.active, name: 'Ativos', itemStyle: { color: '#1a73e8' } },
        { value: vehiclesData.value.maintenance, name: 'Manutenção', itemStyle: { color: '#FF9800' } }
      ]
    }]
  }

  studentsChartOption.value = {
    title: {
      text: 'Alunos por Período',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#022840'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#022840',
      borderWidth: 1
    },
    xAxis: {
      type: 'category',
      data: studentsData.value.byPeriod.map(item => item.period),
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    series: [{
      data: studentsData.value.byPeriod.map(item => item.count),
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

  routesChartOption.value = {
    title: {
      text: 'Eficiência das Rotas (%)',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#022840'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#022840',
      borderWidth: 1
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
      min: 70,
      max: 100,
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    series: [{
      data: routesData.value.efficiency,
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#1a73e8',
        width: 4
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(26, 115, 232, 0.4)' },
          { offset: 1, color: 'rgba(26, 115, 232, 0.05)' }
        ])
      },
      itemStyle: {
        color: '#1a73e8',
        borderWidth: 3,
        borderColor: '#fff'
      },
      symbol: 'circle',
      symbolSize: 8
    }]
  }

  driversChartOption.value = {
    title: {
      text: 'Performance dos Motoristas',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#022840'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#022840',
      borderWidth: 1
    },
    radar: {
      indicator: [
        { name: 'Pontualidade', max: 5 },
        { name: 'Segurança', max: 5 },
        { name: 'Eficiência', max: 5 },
        { name: 'Atendimento', max: 5 },
        { name: 'Manutenção', max: 5 }
      ],
      axisName: {
        color: '#022840',
        fontWeight: 'bold'
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(26, 115, 232, 0.05)', 'rgba(26, 115, 232, 0.1)']
        }
      }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [4.8, 4.7, 4.6, 4.8, 4.5],
          name: 'Média Geral',
          areaStyle: {
            color: 'rgba(26, 115, 232, 0.3)'
          },
          lineStyle: {
            color: '#1a73e8',
            width: 3
          },
          itemStyle: {
            color: '#1a73e8',
            borderWidth: 2,
            borderColor: '#fff'
          }
        }
      ]
    }]
  }

  maintenanceChartOption.value = {
    title: {
      text: 'Status de Manutenção',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#022840'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#022840',
      borderWidth: 1
    },
    xAxis: {
      type: 'category',
      data: ['Pendentes', 'Em Andamento', 'Concluídas'],
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    series: [{
      data: [
        { value: maintenanceData.value.pending, itemStyle: { color: '#F44336' } },
        { value: maintenanceData.value.inProgress, itemStyle: { color: '#FF9800' } },
        { value: maintenanceData.value.completed, itemStyle: { color: '#4CAF50' } }
      ],
      type: 'bar',
      barWidth: '45%',
      itemStyle: {
        borderRadius: [8, 8, 0, 0]
      }
    }]
  }

  realTimeMonitoringOption.value = {
    title: {
      text: 'Veículos em Rota (Tempo Real)',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#022840'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#022840',
      borderWidth: 1
    },
    xAxis: {
      type: 'category',
      data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: 'Veículos',
      axisLine: {
        lineStyle: {
          color: '#022840'
        }
      }
    },
    series: [{
      name: 'Veículos Ativos',
      type: 'line',
      data: [8, 12, 10, 14, 6, 4, 10, 12, 8, 5],
      smooth: true,
      lineStyle: {
        color: '#1a73e8',
        width: 4
      },
      itemStyle: {
        color: '#1a73e8',
        borderWidth: 3,
        borderColor: '#fff'
      },
      symbol: 'circle',
      symbolSize: 8
    }]
  }
})
</script>

<template>
  <div class="dashboard-premium">
    <!-- Header Premium -->
    <div class="dashboard-header">
      <div class="header-content">
        <div class="header-icon">
          <Map :size="50" />
        </div>
        <div class="header-text">
          <h1>Dashboard Administrativo</h1>
          <p>Visão completa do sistema de gerenciamento de transporte</p>
        </div>
      </div>
      <div class="header-badge">
        <TrendingUp :size="24" />
        <span>Sistema Operacional</span>
      </div>
    </div>

    <!-- Cards Premium com Animação -->
    <div class="summary-cards-premium">
      <div class="card-premium vehicles-card">
        <div class="card-background"></div>
        <div class="card-content-premium">
          <div class="card-icon-premium">
            <Bus :size="32" />
          </div>
          <div class="card-info-premium">
            <h3>{{ vehiclesData.total }}</h3>
            <p>Total de Veículos</p>
            <div class="card-stats">
              <span class="stat-active">{{ vehiclesData.active }} ativos</span>
              <span class="stat-maintenance">{{ vehiclesData.maintenance }} manutenção</span>
            </div>
          </div>
        </div>
        <div class="card-glow"></div>
      </div>

      <div class="card-premium students-card">
        <div class="card-background"></div>
        <div class="card-content-premium">
          <div class="card-icon-premium">
            <AccountGroup :size="32" />
          </div>
          <div class="card-info-premium">
            <h3>{{ studentsData.total }}</h3>
            <p>Alunos Cadastrados</p>
            <div class="card-stats">
              <span class="stat-active">{{ studentsData.active }} ativos</span>
              <span class="stat-maintenance">{{ studentsData.inactive }} inativos</span>
            </div>
          </div>
        </div>
        <div class="card-glow"></div>
      </div>

      <div class="card-premium routes-card">
        <div class="card-background"></div>
        <div class="card-content-premium">
          <div class="card-icon-premium">
            <MapMarkerPath :size="32" />
          </div>
          <div class="card-info-premium">
            <h3>{{ routesData.total }}</h3>
            <p>Rotas Ativas</p>
            <div class="card-stats">
              <span class="stat-active">{{ routesData.completed }} concluídas</span>
              <span class="stat-maintenance">{{ routesData.inProgress }} andamento</span>
            </div>
          </div>
        </div>
        <div class="card-glow"></div>
      </div>

      <div class="card-premium drivers-card">
        <div class="card-background"></div>
        <div class="card-content-premium">
          <div class="card-icon-premium">
            <Steering :size="32" />
          </div>
          <div class="card-info-premium">
            <h3>{{ driversData.total }}</h3>
            <p>Motoristas</p>
            <div class="card-stats">
              <span class="stat-active">{{ driversData.active }} ativos</span>
              <span class="stat-maintenance">{{ driversData.onVacation }} férias</span>
            </div>
          </div>
        </div>
        <div class="card-glow"></div>
      </div>
    </div>

    <!-- Gráficos Premium -->
    <div class="charts-section">
      <div class="chart-card-premium">
        <div class="chart-header">
          <h3>Status dos Veículos</h3>
        </div>
        <VChart :option="vehiclesChartOption" style="height: 350px;" />
      </div>

      <div class="chart-card-premium">
        <div class="chart-header">
          <h3>Distribuição de Alunos</h3>
        </div>
        <VChart :option="studentsChartOption" style="height: 350px;" />
      </div>

      <div class="chart-card-premium">
        <div class="chart-header">
          <h3>Eficiência Mensal</h3>
        </div>
        <VChart :option="routesChartOption" style="height: 350px;" />
      </div>
    </div>

    <div class="charts-section">
      <div class="chart-card-premium">
        <div class="chart-header">
          <h3>Performance Geral</h3>
        </div>
        <VChart :option="driversChartOption" style="height: 350px;" />
      </div>

      <div class="chart-card-premium">
        <div class="chart-header">
          <h3>Manutenções</h3>
        </div>
        <VChart :option="maintenanceChartOption" style="height: 350px;" />
      </div>

      <div class="chart-card-premium">
        <div class="chart-header">
          <h3>Monitoramento em Tempo Real</h3>
        </div>
        <VChart :option="realTimeMonitoringOption" style="height: 350px;" />
      </div>
    </div>

    <!-- Botão de Ação Premium -->
    <div class="action-section-premium">
      <button class="action-button-premium" @click="navigateToDetails">
        <span>Ver Detalhes Completos</span>
        <ArrowRight :size="24" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.dashboard-premium {
  --primary: #022840;
  --accent: #1a73e8;
  --gradient-primary: linear-gradient(135deg, #022840, #1a73e8);
  padding: 2rem;
  min-height: 100vh;
  width: 95%;
  margin: 10px auto;
}

/* Header Premium */
.dashboard-header {
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

.dashboard-header::before {
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
  gap: 1.5rem;
}

.header-icon {
  width: 70px;
  height: 70px;
  background: var(--gradient-primary);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 20px rgba(26, 115, 232, 0.3);
}

.header-text h1 {
  color: var(--primary);
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.3rem;
}

.header-text p {
  color: #64748b;
  margin: 0;
  font-size: 1rem;
}

.header-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, rgba(26, 115, 232, 0.1), rgba(2, 40, 64, 0.1));
  border-radius: 25px;
  color: var(--primary);
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.15);
}

/* Cards Premium */
.summary-cards-premium {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card-premium {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.card-premium:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.card-background {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  background: var(--gradient-primary);
  opacity: 0.05;
  border-radius: 50%;
  transform: translate(30%, -30%);
  transition: all 0.4s ease;
}

.card-premium:hover .card-background {
  transform: translate(20%, -20%) scale(1.2);
  opacity: 0.1;
}

.card-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-premium:hover .card-glow {
  opacity: 1;
}

.card-content-premium {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.card-icon-premium {
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 6px 20px rgba(26, 115, 232, 0.3);
  transition: all 0.3s ease;
}

.card-premium:hover .card-icon-premium {
  transform: scale(1.1) rotate(5deg);
}

.card-info-premium h3 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
  margin-bottom: 0.3rem;
  line-height: 1;
}

.card-info-premium p {
  font-size: 1rem;
  font-weight: 600;
  color: #64748b;
  margin: 0;
  margin-bottom: 0.8rem;
}

.card-stats {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.card-stats span {
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  display: inline-block;
  width: fit-content;
}

.stat-active {
  background: rgba(26, 115, 232, 0.1);
  color: var(--accent);
}

.stat-maintenance {
  background: rgba(255, 152, 0, 0.1);
  color: #FF9800;
}

/* Gráficos Premium */
.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-card-premium {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.chart-card-premium::before {
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

.chart-card-premium:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.chart-card-premium:hover::before {
  opacity: 1;
}

.chart-header {
  margin-bottom: 1rem;
}

.chart-header h3 {
  color: var(--primary);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

/* Botão de Ação Premium */
.action-section-premium {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.action-button-premium {
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 1rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(26, 115, 232, 0.35);
  position: relative;
  overflow: hidden;
}

.action-button-premium::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.action-button-premium:hover::before {
  width: 300px;
  height: 300px;
}

.action-button-premium:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(26, 115, 232, 0.45);
}

.action-button-premium span,
.action-button-premium svg {
  position: relative;
  z-index: 1;
}

/* Responsividade */
@media (max-width: 768px) {
  .dashboard-premium {
    padding: 1rem;
  }

  .dashboard-header {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .header-content {
    flex-direction: column;
  }

  .summary-cards-premium {
    grid-template-columns: 1fr;
  }

  .charts-section {
    grid-template-columns: 1fr;
  }

  .header-text h1 {
    font-size: 1.5rem;
  }

  .card-info-premium h3 {
    font-size: 2rem;
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

.card-premium,
.chart-card-premium {
  animation: fadeInUp 0.6s ease-out backwards;
}

.card-premium:nth-child(1) { animation-delay: 0.1s; }
.card-premium:nth-child(2) { animation-delay: 0.2s; }
.card-premium:nth-child(3) { animation-delay: 0.3s; }
.card-premium:nth-child(4) { animation-delay: 0.4s; }

span{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>