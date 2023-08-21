const { sumConsecutiveDuplicates, reduceConsecutives } = require('../sumConsecutiveDuplicates.js');

describe('sumConsecutiveDuplicates()', () => {
    it('should return an array', () => {
        expect(Array.isArray(sumConsecutiveDuplicates([]))).toBeTruthy();
    });

    it('should return the same array if there are no duplicates', () => {
        expect(sumConsecutiveDuplicates([1, 2, 3])).toEqual([1, 2, 3]);
        expect(sumConsecutiveDuplicates([10, 11, 12, 13, 14])).toEqual([10, 11, 12, 13, 14]);
        expect(sumConsecutiveDuplicates([1, 2, 1, 2, 1])).toEqual([1, 2, 1, 2, 1]);
    });

    it('should combine two consecutive duplicates', () => {
        expect(sumConsecutiveDuplicates([1, 1])).toEqual([2]);
        expect(sumConsecutiveDuplicates([1, 2, 3, 3])).toEqual([1, 2, 6]);
        expect(sumConsecutiveDuplicates([1, 1, 2, 2, 3, 3, 4, 4])).toEqual([2, 4, 6, 8]);
        expect(sumConsecutiveDuplicates([1, 1, 1, 1, 2, 2, 4])).toEqual([4, 4, 4]);
    });

    it('should combine two consecutive duplicates', () => {
        expect(sumConsecutiveDuplicates([1, 1])).toEqual([2]);
        expect(sumConsecutiveDuplicates([1, 2, 3, 3])).toEqual([1, 2, 6]);
        expect(sumConsecutiveDuplicates([1, 1, 2, 2, 3, 3, 4, 4])).toEqual([2, 4, 6, 8]);
        expect(sumConsecutiveDuplicates([4, 2, 2, 4, 2, 2])).toEqual([4, 4, 4, 4]);
    });

    it('should combine multiple consecutive duplicates', () => {
        expect(sumConsecutiveDuplicates([1, 1, 1])).toEqual([3]);
        expect(sumConsecutiveDuplicates([1, 2, 2, 2, 3, 3])).toEqual([1, 6, 6]);
        expect(sumConsecutiveDuplicates([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4])).toEqual([3, 6, 9, 12]);
        expect(sumConsecutiveDuplicates([1, 1, 1, 1, 2, 2, 4])).toEqual([4, 4, 4]);
    });

    it('should combine negative consecutive duplicates', () => {
        expect(sumConsecutiveDuplicates([-1, -1, -1])).toEqual([-3]);
        expect(sumConsecutiveDuplicates([1, -2, -2, -2, 3, 3])).toEqual([1, -6, 6]);
        expect(sumConsecutiveDuplicates([1, 1, 1, -2, -2, -2, 3, 3, 3, -4, -4, -4])).toEqual([3, -6, 9, -12]);
        expect(sumConsecutiveDuplicates([1, 1, -1, -1, 2, 2, -4])).toEqual([2, -2, 4, -4]);
    });

    it('should return a string (error message) when not passed an array', () => {
        expect(typeof sumConsecutiveDuplicates()).toBe('string');
        expect(typeof sumConsecutiveDuplicates(1, 2, 3)).toBe('string');
        expect(typeof sumConsecutiveDuplicates({nums: [1, 2, 3]})).toBe('string');
    });

    it('should return a string (error message) when not passed an array of integers', () => {
        expect(typeof sumConsecutiveDuplicates(['a', 'b', 'c'])).toBe('string');
        expect(typeof sumConsecutiveDuplicates(['a', 2, 3])).toBe('string');
    });

    it('should not mutate the input array', () => {
        const input = [1, 1, 2, 2, 2];
        const inputClone = [1, 1, 2, 2, 2];

        sumConsecutiveDuplicates(input);

        expect(input).toEqual(inputClone);
    });
});

describe('reduceConsecutives()', () => {
    it('should return an array', () => {
        expect(Array.isArray(reduceConsecutives([]))).toBeTruthy();
    });

    it('should return the same array if there are no duplicates', () => {
        expect(reduceConsecutives([1, 2, 3])).toEqual([1, 2, 3]);
        expect(reduceConsecutives([10, 11, 12, 13, 14])).toEqual([10, 11, 12, 13, 14]);
        expect(reduceConsecutives([1, 2, 1, 2, 1])).toEqual([1, 2, 1, 2, 1]);
    });

    it('should reduce consecutive duplicates in one pass', () => {
        expect(reduceConsecutives([1, 1, 2, 2, 3, 3])).toEqual([2, 4, 6]);
    });

    it('should reduce consecutive duplicates in two passes', () => {
        expect(reduceConsecutives([1, 1, 1, 1, 2, 2, 10])).toEqual([8, 10]);
    });

    it('should reduce consecutive duplicates in multiple passes', () => {
        expect(reduceConsecutives([1, 1, 1, 1, 2, 2, 8])).toEqual([16]);
    });

    it('should return a string (error message) when not passed an array', () => {
        expect(typeof reduceConsecutives()).toBe('string');
        expect(typeof reduceConsecutives(1, 2, 3)).toBe('string');
        expect(typeof reduceConsecutives({nums: [1, 2, 3]})).toBe('string');
    });

    it('should return a string (error message) when not passed an array of integers', () => {
        expect(typeof reduceConsecutives(['a', 'b', 'c'])).toBe('string');
        expect(typeof reduceConsecutives(['a', 2, 3])).toBe('string');
    });

    it('should not mutate the input array', () => {
        const input = [1, 1, 2, 2, 2];
        const inputClone = [1, 1, 2, 2, 2];

        reduceConsecutives(input);

        expect(input).toEqual(inputClone);
    });
});