export default function getColor(num: number) {
    
    const roundedNum = Math.round(num) as 1 | 2 | 3 | 4 | 5;
    
    const colorMap: Record<number, string> = {
        1: 'var(--warning-red)',
        2: 'var(--warning-red)',
        3: 'var(--primary-blue)',
        4: 'var(--primary-blue)',
        5: 'var(--primary-green)',
    };
    
    return colorMap[roundedNum] || 'var(--primary-blue)';
}