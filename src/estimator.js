const covid19ImpactEstimator = (data) => {
    const {
            
        region: {
        avgDailyIncomeInUSD
        },
        reportedCases,
        periodType,
        timeToElapse,
        population,
        totalHospitalBeds,
    } = data;

const impact = {};
const severeImpact = {};

impact.currentlyInfected = Math.trunc(reportedCases * 10);
severeImpact.currentlyInfected = Math.trunc(reportedCases * 50);

let timeFactor;

switch(periodType.trim().toLowerCase()) {
    case 'months':
timeFactor = Math.trunc((timeToElapse * 30) / 3);
break;
case 'weeks':
timeFactor = Math.trunc((timeToElapse * 7) / 3);
break;
case 'days':
timeFactor = Mth.trunc((timeToElapse) / 3);
break;
default:
}

// Time passed as infection ration grows

impact.infectionsByRequestdTime = impact.currentlyInfected * (2 ** timeFactor);
severeImpact.infectionsByRequestdTime = severeImpact.currentlyInfected * (2 ** timeFactor);


// Challenge 2

const impactRequestedTime = impact.infectionsByRequestdTime * 0.15;
const severeImpactRequest = severeImpact.infectionsByRequestdTime * 0.15;

impact.severeCasesByRequestedTime = Math.trunc(impactRequestedTime);
severeImpact.severeCasesByRequestedTime = Math.trunc(severeImpactRequest);

const availableBeds = totalHospitalBeds * 0.35;
const impactHospitalBeds = availableBeds - impactRequestedTime;
const severeHospitalBeds = availableBeds = severeImpactRequest;

impact.hospitalBedsByRequestedTime = Math.trunc(impactHospitalBeds);
severeImpact.hospitalBedsByRequestedTime = Math.trunc(severeHospitalBeds);


// Challenge 3

const impactCasesforICU = impact.infectionsByRequestdTime * 0.15;
const severeImapctCasesforICU = severeImpact.infectionsByRequestdTime * 0.15;
const impactVentilator = impact.infectionsByRequestdTime * 0.2;
const severeImpactVentilator = severeImpact.infectionsByRequestdTime * 0.2;

impact.casesForICUByRequestedTime = Math.trunc(impactCasesforICU);
severeImpact.casesForICUByRequestedTime = Math.trunc(severeImapctCasesforICU);

impact.casesForVentilatorByRequestedTime = Math.trunc(impactVentilator);
severeImpact.casesForVentilatorByRequestedTime = Math.trunc(severeImpactVentilator);

let newDay;
const compute = population * avgDailyIncomeInUSD;
if (periodType === 'months') {
    newDay = timeToElapse * 30;
impact.dollarsInFlight = (Math.trunc(impact.infectionsByRequestdTime * compute) / newDay);
severeImpact.dollarsInFlight = (Math.trunc(severeImpact.infectionsByRequestdTime * compute) / newDay);
}
else if (periodType == 'weeks') {
    newDay = timeToElapse * 7;
impact.dollarsInFlight = (Math.trunc(infectionsByRequestdTime * compute) / newDay);
severeImpact.dollarsInFlight = (Math.trunc(infectionsByRequestdTime * compute) / newDay);
}
else if (periodType === 'days') {
    newDay = timeToElapse * 1;
impact.dollarsInFlight = (Math.trunc(infectionsByRequestdTime * compute) / newDay);
severeImpact.dollarsInFlight = (Math.trunc(infectionsByRequestdTime * compute) / newDay);
}

return {
    data,
    impact,
    severeImpact
};
}
export default covid19ImpactEstimator;