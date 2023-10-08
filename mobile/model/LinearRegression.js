import ss from "simple-statistics"

const generateDataset = () => {
    const dataset = [];
    for (let i = 0; i < 50; i++) {
        const randomHumidity = Math.random() * (60 - 30) + 30;
        const randomTemperature = Math.random() * (40 - 30) + 30;
        const randomTimeActive = Math.random() * (10 - 1) + 1;
        const randomRadius = Math.random() * (400 - 200) + 200;
        const randomControl = Math.random() < 0.5 ? 0 : 1;
        const randomLocationLatitude = Math.random();
        const randomLocationLongitude = Math.random();

        const expectedOutput = randomHumidity * 0.01 + randomTemperature * 0.02 + randomTimeActive * 0.03 - randomRadius * 0.01 + randomControl * 0.05;

        dataset.push([
            randomHumidity,
            randomTemperature,
            randomTimeActive,
            randomRadius,
            randomControl,
            randomLocationLatitude,
            randomLocationLongitude,
            expectedOutput,
        ]);
    }

    return dataset;
};

export function predictFireDestructiveness(
    humidity,
    temperature,
    timeActive,
    radius,
    control,
    locationLatitude,
    locationLongitude
) {
    const dataset = generateDataset();

    const inputValues = [
        humidity,
        temperature,
        timeActive,
        radius,
        control,
        locationLatitude,
        locationLongitude
    ];

    const inputFeatures = dataset.map((row) => row.slice(0, -3));
    const expectedOutputs = dataset.map((row) => row[row.length - 1]);

    const data = inputFeatures.map((input, index) => [...input, expectedOutputs[index]]);

    const regressionResult = ss.linearRegression(data);

    const prediction = ss.linearRegressionLine(regressionResult)(inputValues);
    if (radius > 300) return 'Destructive'
    if (!isNaN(prediction)) {
        return prediction > 0.5 ? 'Destructive' : 'Beneficial';
    } else {
        return 'Invalid input';
    }
}
