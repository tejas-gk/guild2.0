import * as math from 'mathjs';

interface DataPoint {
    features: number[];
    label: string;
}

function knn(dataset: DataPoint[], testPoint: number[], k: number): string {
    // Compute distances between test point and all data points in the dataset
    const distances = dataset.map((dataPoint) => {
        const dist = math.distance(dataPoint.features, testPoint);
        return { dist, label: dataPoint.label };
    });

    // Sort distances in ascending order
    distances.sort((a, b) => a.dist - b.dist);

    // Get the k-nearest neighbors
    const neighbors = distances.slice(0, k);

    // Count the occurrences of each label in the neighbors
    const labelCounts: { [key: string]: number } = {};
    neighbors.forEach((neighbor) => {
        if (labelCounts[neighbor.label]) {
            labelCounts[neighbor.label]++;
        } else {
            labelCounts[neighbor.label] = 1;
        }
    });

    // Determine the predicted class label based on the majority vote of the neighbors
    let maxCount = 0;
    let maxLabel = '';
    Object.keys(labelCounts).forEach((label) => {
        if (labelCounts[label] > maxCount) {
            maxCount = labelCounts[label];
            maxLabel = label;
        }
    });

    return maxLabel;
}

export { knn };
