import Link from 'next/link';
import { knn } from '@/utils/knn';

interface DataPoint {
    features: number[];
    label: string;
}

const NotFoundPage = () => {
    const dataset: DataPoint[] = [
        { features: [1, 2, 3], label: 'A' },
        { features: [4, 5, 6], label: 'B' },
        { features: [7, 8, 9], label: 'A' },
        { features: [10, 11, 12], label: 'B' },
    ];
    const testPoint = [5, 6, 7];

    const predictedLabel = knn(dataset, testPoint, 3);
    console.log(predictedLabel); // Output: 'B'

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold text-gray-800 mb-4'>
                Oops! Page not found.
            </h1>
            <p className='text-gray-600 mb-4'>
                The page you were looking for doesn&apos;t exist.
            </p>
            <Link href='/'>
                <p className='text-blue-500 hover:underline'>
                    Go back to homepage
                </p>
            </Link>
            {/* <img src='404.svg' alt="404 Error" className="w-96 mt-8" /> */}
        </div>
    );
};

export default NotFoundPage;
