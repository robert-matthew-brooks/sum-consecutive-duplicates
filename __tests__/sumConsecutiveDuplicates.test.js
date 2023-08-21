const { sumConsecutiveDuplicates, reduceConsecutives } = require('../sumConsecutiveDuplicates.js');

// override mock frontend functions
// these are visual only and do not affect the returned array
disableControls = jest.fn();
highlightCard = jest.fn();
highlightCardDuplicates = jest.fn();
removeCardDuplicates = jest.fn();
highlightCardNoDuplicates = jest.fn();
setupCardsNoAnimation = jest.fn();
resetSelect = jest.fn();

describe('sumConsecutiveDuplicates()', () => {
    it('should return an array', async () => {
        expect(Array.isArray(await sumConsecutiveDuplicates([]))).toBeTruthy();
    });

    it('should return the same array if there are no duplicates', async () => {
        expect(await sumConsecutiveDuplicates([1, 2, 3])).toEqual([1, 2, 3]);
        expect(await sumConsecutiveDuplicates([10, 11, 12, 13, 14])).toEqual([10, 11, 12, 13, 14]);
        expect(await sumConsecutiveDuplicates([1, 2, 1, 2, 1])).toEqual([1, 2, 1, 2, 1]);
    });

    it('should combine two consecutive duplicates', async () => {
        expect(await sumConsecutiveDuplicates([1, 1])).toEqual([2]);
        expect(await sumConsecutiveDuplicates([1, 2, 3, 3])).toEqual([1, 2, 6]);
        expect(await sumConsecutiveDuplicates([1, 1, 2, 2, 3, 3, 4, 4])).toEqual([2, 4, 6, 8]);
        expect(await sumConsecutiveDuplicates([1, 1, 1, 1, 2, 2, 4])).toEqual([4, 4, 4]);
    });

    it('should combine two consecutive duplicates', async () => {
        expect(await sumConsecutiveDuplicates([1, 1])).toEqual([2]);
        expect(await sumConsecutiveDuplicates([1, 2, 3, 3])).toEqual([1, 2, 6]);
        expect(await sumConsecutiveDuplicates([1, 1, 2, 2, 3, 3, 4, 4])).toEqual([2, 4, 6, 8]);
        expect(await sumConsecutiveDuplicates([4, 2, 2, 4, 2, 2])).toEqual([4, 4, 4, 4]);
    });

    it('should combine multiple consecutive duplicates', async () => {
        expect(await sumConsecutiveDuplicates([1, 1, 1])).toEqual([3]);
        expect(await sumConsecutiveDuplicates([1, 2, 2, 2, 3, 3])).toEqual([1, 6, 6]);
        expect(await sumConsecutiveDuplicates([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4])).toEqual([3, 6, 9, 12]);
        expect(await sumConsecutiveDuplicates([1, 1, 1, 1, 2, 2, 4])).toEqual([4, 4, 4]);
    });

    it('should combine negative consecutive duplicates', async () => {
        expect(await sumConsecutiveDuplicates([-1, -1, -1])).toEqual([-3]);
        expect(await sumConsecutiveDuplicates([1, -2, -2, -2, 3, 3])).toEqual([1, -6, 6]);
        expect(await sumConsecutiveDuplicates([1, 1, 1, -2, -2, -2, 3, 3, 3, -4, -4, -4])).toEqual([3, -6, 9, -12]);
        expect(await sumConsecutiveDuplicates([1, 1, -1, -1, 2, 2, -4])).toEqual([2, -2, 4, -4]);
    });

    it('should return a string (error message) when not passed an array', async () => {
        expect(typeof await sumConsecutiveDuplicates()).toBe('string');
        expect(typeof await sumConsecutiveDuplicates(1, 2, 3)).toBe('string');
        expect(typeof await sumConsecutiveDuplicates({nums: [1, 2, 3]})).toBe('string');
    });

    it('should return a string (error message) when not passed an array of integers', async () => {
        expect(typeof await sumConsecutiveDuplicates(['a', 'b', 'c'])).toBe('string');
        expect(typeof await sumConsecutiveDuplicates(['a', 2, 3])).toBe('string');
    });

    it('should not mutate the input array', async () => {
        const input = [1, 1, 2, 2, 2];
        const inputClone = [1, 1, 2, 2, 2];

        await sumConsecutiveDuplicates(input);

        expect(input).toEqual(inputClone);
    });
});

describe('reduceConsecutives()', () => {
    it('should return an array', async () => {
        expect(Array.isArray(await reduceConsecutives([]))).toBeTruthy();
    });

    it('should return the same array if there are no duplicates', async () => {
        expect(await reduceConsecutives([1, 2, 3])).toEqual([1, 2, 3]);
        expect(await reduceConsecutives([10, 11, 12, 13, 14])).toEqual([10, 11, 12, 13, 14]);
        expect(await reduceConsecutives([1, 2, 1, 2, 1])).toEqual([1, 2, 1, 2, 1]);
    });

    it('should reduce consecutive duplicates in one pass', async () => {
        expect(await reduceConsecutives([1, 1, 2, 2, 3, 3])).toEqual([2, 4, 6]);
    });

    it('should reduce consecutive duplicates in two passes', async () => {
        expect(await reduceConsecutives([1, 1, 1, 1, 2, 2, 10])).toEqual([8, 10]);
    });

    it('should reduce consecutive duplicates in multiple passes', async () => {
        expect(await reduceConsecutives([1, 1, 1, 1, 2, 2, 8])).toEqual([16]);
    });

    it('should return a string (error message) when not passed an array', async () => {
        expect(typeof await reduceConsecutives()).toBe('string');
        expect(typeof await reduceConsecutives(1, 2, 3)).toBe('string');
        expect(typeof await reduceConsecutives({nums: [1, 2, 3]})).toBe('string');
    });

    it('should return a string (error message) when not passed an array of integers', async () => {
        expect(typeof await reduceConsecutives(['a', 'b', 'c'])).toBe('string');
        expect(typeof await reduceConsecutives(['a', 2, 3])).toBe('string');
    });

    it('should not mutate the input array', async () => {
        const input = [1, 1, 2, 2, 2];
        const inputClone = [1, 1, 2, 2, 2];

        await reduceConsecutives(input);

        expect(input).toEqual(inputClone);
    });
});