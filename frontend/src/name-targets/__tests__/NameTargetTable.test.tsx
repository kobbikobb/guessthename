import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the Router component
import NameTargetTable from '../NameTargetTable';

const mockData = [
    { title: 'Test Target 1', createdAt: '2024-01-01' },
    { title: 'Test Target 2', createdAt: '2024-01-02' }
];

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    return <Router>{children}</Router>;
};

describe('NameTargetTable', () => {
    it('should render table when data is provided', () => {
        const { getByText } = render(
            <TestWrapper>
                <NameTargetTable data={mockData} />
            </TestWrapper>
        );

        expect(getByText('Test Target 1')).toBeInTheDocument();
        expect(getByText('2024-01-01')).toBeInTheDocument();
    });
});
