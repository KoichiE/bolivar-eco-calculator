
// ==========================================
// BOLIVAR ECO-CALCULATOR
// Main functionality: Language, Calculator, PDF
// ==========================================

const languageSelector = document.getElementById("language");
const ecoForm = document.getElementById("ecoForm");
const resultsSection = document.getElementById("results");
const printButton = document.getElementById("printButton");

// TRANSLATIONS

const translations = {
    es: {
        heroTag: "PROYECTO DE CAMPUS SOSTENIBLE",
        heroTitle: 'Pequeñas acciones.<br><span>Un planeta mejor.</span>',
        heroDescription: "Descubre cómo tus hábitos diarios impactan el medio ambiente y encuentra formas de reducir tu huella de carbono.",
        stepLabel: "TU EVALUACIÓN",
        calculatorTitle: "Calcula tu impacto",
        transportLabel: "01. ¿Cómo llegas al colegio?",
        transports: ["Bus", "Carro privado", "Carro compartido", "Bicicleta o caminando"],
        paperLabel: "02. ¿Cuántas hojas de papel usas al día?",
        paperHint: "Escribe un número entre 0 y 500.",
        recyclingLabel: "03. ¿Cuál es tu nivel de reciclaje?",
        recycling: ["Bajo", "Medio", "Alto"],
        calculate: "Calcular mi impacto",
        estimateNote: "*Los resultados son estimaciones educativas basadas en tus respuestas.",
        resultsTag: "TUS RESULTADOS",
        resultsTitle: "Tu impacto semanal",
        resultsDescription: "Aquí está el resumen de tu impacto ambiental.",
        co2Label: "Emisiones estimadas de CO₂",
        co2Caption: "Por semana escolar (5 días)",
        pointsLabel: "Eco-Points",
        pointsCaption: "Tu puntuación ecológica",
        print: "Imprimir / Guardar PDF",
        messages: [
            "¡Excelente trabajo! Estás tomando buenas decisiones ambientales.",
            "¡Buen trabajo! Puedes seguir mejorando tus hábitos.",
            "Puedes hacer algunos cambios para reducir tu impacto ambiental.",
            "Intenta mejorar tus hábitos para ayudar al planeta."
        ],
        error: "Por favor, introduce un número entre 0 y 500.",
        footerText: "Un paso hacia un futuro más sostenible.",
        reportLabel: "REPORTE DE IMPACTO AMBIENTAL",
        reportTitle: "Tu compromiso con el planeta",
        reportDescription: "Este reporte presenta los resultados de tu evaluación ambiental.",
        reportCO2Label: "Emisiones semanales de CO₂",
        reportPointsLabel: "Eco-Points obtenidos",
        reportTransportLabel: "Transporte:",
        reportPaperLabel: "Hojas por día:",
        reportRecyclingLabel: "Nivel de reciclaje:",
        reportMessage: "Gracias por tomar decisiones más sostenibles.",
        recyclingNames: ["Bajo", "Medio", "Alto"]
    },

    en: {
        heroTag: "SUSTAINABLE CAMPUS PROJECT",
        heroTitle: 'Small actions.<br><span>A better planet.</span>',
        heroDescription: "Discover how your daily habits affect the environment and find ways to reduce your carbon footprint.",
        stepLabel: "YOUR ASSESSMENT",
        calculatorTitle: "Calculate your impact",
        transportLabel: "01. How do you get to school?",
        transports: ["Bus", "Private car", "Carpool", "Bicycle or walking"],
        paperLabel: "02. How many sheets of paper do you use daily?",
        paperHint: "Enter a number between 0 and 500.",
        recyclingLabel: "03. What is your recycling level?",
        recycling: ["Low", "Medium", "High"],
        calculate: "Calculate my impact",
        estimateNote: "*Results are educational estimates based on your answers.",
        resultsTag: "YOUR RESULTS",
        resultsTitle: "Your weekly impact",
        resultsDescription: "Here is a summary of your environmental impact.",
        co2Label: "Estimated CO₂ emissions",
        co2Caption: "Per school week (5 days)",
        pointsLabel: "Eco-Points",
        pointsCaption: "Your environmental score",
        print: "Print / Save as PDF",
        messages: [
            "Excellent work! You are making environmentally friendly choices.",
            "Good job! You can keep improving your habits.",
            "You can make some changes to reduce your environmental impact.",
            "Try improving your habits to help the planet."
        ],
        error: "Please enter a number between 0 and 500.",
        footerText: "One step towards a more sustainable future.",
        reportLabel: "ENVIRONMENTAL IMPACT REPORT",
        reportTitle: "Your commitment to the planet",
        reportDescription: "This report presents the results of your environmental assessment.",
        reportCO2Label: "Weekly CO₂ emissions",
        reportPointsLabel: "Eco-Points earned",
        reportTransportLabel: "Transportation:",
        reportPaperLabel: "Sheets per day:",
        reportRecyclingLabel: "Recycling level:",
        reportMessage: "Thank you for making more sustainable choices.",
        recyclingNames: ["Low", "Medium", "High"]
    }
};

// SAVE LAST CALCULATION

let lastCalculation = null;

// ==========================================
// LANGUAGE FUNCTION
// ==========================================

function changeLanguage() {
    const lang = languageSelector.value;
    const t = translations[lang];

    document.documentElement.lang = lang;

    document.getElementById("heroTag").textContent = t.heroTag;
    document.getElementById("heroTitle").innerHTML = t.heroTitle;
    document.getElementById("heroDescription").textContent = t.heroDescription;

    document.getElementById("stepLabel").textContent = t.stepLabel;
    document.getElementById("calculatorTitle").textContent = t.calculatorTitle;
    document.getElementById("transportLabel").textContent = t.transportLabel;
    document.getElementById("paperLabel").textContent = t.paperLabel;
    document.getElementById("paperHint").textContent = t.paperHint;
    document.getElementById("recyclingLabel").textContent = t.recyclingLabel;

    document.getElementById("calculateText").textContent = t.calculate;
    document.getElementById("estimateNote").textContent = t.estimateNote;

    document.getElementById("resultsTag").textContent = t.resultsTag;
    document.getElementById("resultsTitle").textContent = t.resultsTitle;
    document.getElementById("resultsDescription").textContent = t.resultsDescription;
    document.getElementById("co2Label").textContent = t.co2Label;
    document.getElementById("co2Caption").textContent = t.co2Caption;
    document.getElementById("pointsLabel").textContent = t.pointsLabel;
    document.getElementById("pointsCaption").textContent = t.pointsCaption;

    document.getElementById("printText").textContent = t.print;
    document.getElementById("footerText").textContent = t.footerText;

    // Update transportation options
    const transportOptions = document.getElementById("transport").options;

    for (let i = 0; i < transportOptions.length; i++) {
        transportOptions[i].textContent = t.transports[i];
    }

    // Update recycling options
    const recyclingOptions = document.getElementById("recycling").options;

    for (let i = 0; i < recyclingOptions.length; i++) {
        recyclingOptions[i].textContent = t.recycling[i];
    }

    // Recalculate and translate existing results
    if (lastCalculation !== null) {
        calculateImpact();
    }
}

// ==========================================
// CALCULATOR FUNCTION
// ==========================================

function calculateImpact() {
    const lang = languageSelector.value;
    const t = translations[lang];

    const transport = document.getElementById("transport").value;
    const paperInput = document.getElementById("paper");
    const paper = Number(paperInput.value);
    const recycling = document.getElementById("recycling").value;

    // Validate paper input
    if (
        paperInput.value.trim() === "" ||
        !Number.isFinite(paper) ||
        paper < 0 ||
        paper > 500
    ) {
        alert(t.error);
        paperInput.focus();
        return;
    }

    // Estimated daily transportation emissions (kg CO2)
    const transportEmissions = {
        bus: 0.6,
        private: 2.0,
        shared: 1.0,
        bike: 0
    };

    // Recycling factors
    const recyclingFactors = {
        low: 1.0,
        medium: 0.8,
        high: 0.6
    };

    // Calculate weekly CO2 emissions
    const schoolDays = 5;

    const transportCO2 = transportEmissions[transport] * schoolDays;

    const paperCO2 =
        paper * 0.005 * schoolDays * recyclingFactors[recycling];

    const totalCO2 = transportCO2 + paperCO2;

    // Eco-Points system
    const transportPoints = {
        bus: 30,
        private: 10,
        shared: 25,
        bike: 40
    };

    const recyclingPoints = {
        low: 10,
        medium: 20,
        high: 30
    };

    const paperPoints = Math.max(0, 30 - paper * 1.5);

    const totalPoints = Math.min(
        100,
        transportPoints[transport] +
        recyclingPoints[recycling] +
        paperPoints
    );

    // Select feedback based on score
    let messageIndex;

    if (totalPoints >= 80) {
        messageIndex = 0;
    } else if (totalPoints >= 60) {
        messageIndex = 1;
    } else if (totalPoints >= 40) {
        messageIndex = 2;
    } else {
        messageIndex = 3;
    }

    // Save calculation
    lastCalculation = {
        transport,
        paper,
        recycling,
        totalCO2,
        totalPoints,
        messageIndex
    };

    // Display results
    document.getElementById("co2Result").textContent =
        totalCO2.toFixed(2);

    document.getElementById("pointsResult").textContent =
        Math.round(totalPoints);

    document.getElementById("message").textContent =
        t.messages[messageIndex];

    resultsSection.hidden = false;

    // Update the printable report
    updatePrintReport();
}

// ==========================================
// PRINT REPORT FUNCTION
// ==========================================

function updatePrintReport() {
    if (lastCalculation === null) return;

    const lang = languageSelector.value;
    const t = translations[lang];
    const data = lastCalculation;

    const transportNames = t.transports;
    const transportIndexes = {
        bus: 0,
        private: 1,
        shared: 2,
        bike: 3
    };

    const recyclingIndexes = {
        low: 0,
        medium: 1,
        high: 2
    };

    document.getElementById("reportLabel").textContent = t.reportLabel;
    document.getElementById("reportTitle").textContent = t.reportTitle;
    document.getElementById("reportDescription").textContent = t.reportDescription;

    document.getElementById("reportCO2Label").textContent = t.reportCO2Label;
    document.getElementById("reportPointsLabel").textContent = t.reportPointsLabel;

    document.getElementById("reportTransportLabel").textContent = t.reportTransportLabel;
    document.getElementById("reportPaperLabel").textContent = t.reportPaperLabel;
    document.getElementById("reportRecyclingLabel").textContent = t.reportRecyclingLabel;

    document.getElementById("reportCO2").textContent =
        data.totalCO2.toFixed(2);

    document.getElementById("reportPoints").textContent =
        Math.round(data.totalPoints);

    document.getElementById("reportTransport").textContent =
        transportNames[transportIndexes[data.transport]];

    document.getElementById("reportPaper").textContent =
        data.paper;

    document.getElementById("reportRecycling").textContent =
        t.recyclingNames[recyclingIndexes[data.recycling]];

    document.getElementById("reportMessage").textContent =
        t.messages[data.messageIndex] + " " + t.reportMessage;
}

// ==========================================
// EVENT LISTENERS
// ==========================================

// Calculate when the form is submitted
ecoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    calculateImpact();
});

// Change language
languageSelector.addEventListener("change", changeLanguage);

// Print or save as PDF
printButton.addEventListener("click", function() {
    if (lastCalculation === null) return;

    updatePrintReport();
    window.print();
});

// ==========================================
// INITIALIZE APPLICATION
// ==========================================

changeLanguage();
