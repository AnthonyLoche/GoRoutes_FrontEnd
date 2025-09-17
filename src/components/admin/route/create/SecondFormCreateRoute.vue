    <template>
        <div class="first-form-create-route f">

            <div class="form-grid">
                <div class="form-section">
                    <div class="section-header">
                        <h3>📋 Passageiros</h3>


                    </div>

                </div>



            </div>
        </div>
    </template>

<script setup>

</script>

<style scoped>
.first-form-create-route f {
    --primary: #022840;
    --primary-dark: #011a2b;
    --secondary: #0d4f6b;
    --accent: #1a73e8;
    --white: #ffffff;
    --bg-light: #f8fafc;
    --text: #334155;
    --text-light: #64748b;
    --shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    --radius: 12px;
    --success: #10b981;
    --warning: #f59e0b;
}

.first-form-create-route f {
    padding: 2rem;
    min-height: 100vh;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
}

.route-header {
    background: white;
    border-radius: var(--radius);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.route-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
}

.header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.header-icon {
    background-clip: text;
    -webkit-background-clip: text;
    color: var(--primary-color);
}

.route-header h1 {
    color: var(--primary);
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
}

.route-header p {
    color: var(--text-light);
    margin: 0;
    font-size: 0.9rem;
}

.save-button {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: white;
    border: none;
    border-radius: 25px;
    padding: 0.75rem 2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
}

.save-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.save-button:hover::before {
    left: 100%;
}

.save-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(26, 115, 232, 0.4);
}

.save-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.form-section {
    background: white;
    border-radius: var(--radius);
    padding: 2rem;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.form-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--bg-light);
}

.section-header h3 {
    color: var(--primary);
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
}

.passenger-count {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text);
    font-weight: 500;
    font-size: 0.9rem;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: var(--radius);
    font-size: 0.9rem;
    transition: all 0.3s ease;
    background: white;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
}

.form-group textarea {
    resize: vertical;
    min-height: 80px;
}

.distance-input {
    display: flex;
    gap: 0.5rem;
}

.distance-input input {
    flex: 1;
}

.calculate-btn {
    background: var(--secondary);
    color: white;
    border: none;
    border-radius: var(--radius);
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.8rem;
    white-space: nowrap;
}

.calculate-btn:hover {
    background: var(--primary);
    transform: scale(1.05);
}

.time-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

/* Checkbox customizado */
.checkbox-label {
    display: flex !important;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    margin-bottom: 0.5rem !important;
}

.checkbox-label input[type="checkbox"] {
    display: none;
}

.checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid #e2e8f0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-size: 0.8rem;
    color: transparent;
}

.checkbox-label input[type="checkbox"]:checked+.checkmark {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    border-color: var(--accent);
    color: white;
}

.form-group small {
    display: block;
    color: var(--text-light);
    font-size: 0.8rem;
    margin-top: 0.25rem;
}

.passengers-section {
    grid-column: 1 / -1;
}

.passengers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    max-height: 400px;
    overflow-y: auto;
    padding: 0.5rem;
}

.passenger-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
    position: relative;
}

.passenger-card:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(26, 115, 232, 0.1);
}

.passenger-card.active {
    border-color: var(--accent);
    background: linear-gradient(135deg, rgba(26, 115, 232, 0.05), rgba(2, 40, 64, 0.05));
}

.passenger-card.active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
}

.passenger-avatar {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
}

.passenger-info {
    flex: 1;
}

.passenger-info strong {
    display: block;
    color: var(--text);
    font-size: 0.9rem;
}

.passenger-info small {
    color: var(--text-light);
    font-size: 0.8rem;
}

.passenger-check {
    width: 24px;
    height: 24px;
    border: 2px solid #e2e8f0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.passenger-card.active .passenger-check {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    border-color: var(--accent);
    color: white;
}

/* Resumo da Rota */
.route-summary {
    background: white;
    border-radius: var(--radius);
    padding: 2rem;
    box-shadow: var(--shadow);
    position: relative;
    overflow: hidden;
}

.route-summary::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--success), var(--accent));
}

.route-summary h3 {
    color: var(--primary);
    margin: 0 0 1.5rem 0;
    font-size: 1.3rem;
    font-weight: 600;
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.summary-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-light);
    border-radius: var(--radius);
    transition: all 0.3s ease;
}

.summary-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.summary-icon {
    font-size: 1.5rem;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
}

.summary-item strong {
    display: block;
    color: var(--text);
    font-size: 0.95rem;
    margin-bottom: 0.2rem;
}

.summary-item small {
    color: var(--text-light);
    font-size: 0.8rem;
}

/* Responsivo */
@media (max-width: 768px) {
    .create-route-container {
        padding: 1rem;
    }

    .route-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }

    .time-grid {
        grid-template-columns: 1fr;
    }

    .summary-grid {
        grid-template-columns: 1fr;
    }

    .passengers-grid {
        grid-template-columns: 1fr;
    }

    .distance-input {
        flex-direction: column;
    }
}

@media (max-width: 480px) {
    .passengers-grid {
        max-height: 300px;
    }

    .passenger-card {
        padding: 0.75rem;
    }

    .passenger-avatar {
        width: 35px;
        height: 35px;
        font-size: 0.8rem;
    }
}
</style>