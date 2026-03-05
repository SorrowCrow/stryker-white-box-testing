const CommentController = require('./commentController');

describe('CommentController', () => {
  let controller;

  beforeEach(() => {
    controller = new CommentController();
  });

  describe('submitComment', () => {
    // Valid cases
    it('should successfully save a valid comment', () => {
      const text = 'ValidComment';
      const rating = 5;
      const result = controller.submitComment(text, rating);
      expect(result.success).toBe(true);
      expect(result.comment.text).toBe(text);
      expect(result.comment.securityRating).toBe(rating);
      expect(controller.comments.length).toBe(1);
    });

    it('should save a comment with minimum valid length (3)', () => {
      const text = '123';
      const result = controller.submitComment(text, 5);
      expect(result.success).toBe(true);
      expect(result.comment.text).toBe(text);
    });

    it('should save a comment with maximum valid length (300)', () => {
      const text = 'a'.repeat(300);
      const result = controller.submitComment(text, 5);
      expect(result.success).toBe(true);
      expect(result.comment.text).toBe(text);
    });

    it('should save a comment with minimum valid rating (1)', () => {
      const result = controller.submitComment('Valid', 1);
      expect(result.success).toBe(true);
      expect(result.comment.securityRating).toBe(1);
    });

    it('should save a comment with maximum valid rating (10)', () => {
      const result = controller.submitComment('Valid', 10);
      expect(result.success).toBe(true);
      expect(result.comment.securityRating).toBe(10);
    });

    // Invalid cases - text
    it('should throw if text is not a string (null)', () => {
      expect(() => controller.submitComment(null, 5)).toThrow('Invalid text: must be a string');
    });

    it('should throw if text is not a string (undefined)', () => {
      expect(() => controller.submitComment(undefined, 5)).toThrow('Invalid text: must be a string');
    });

    it('should throw if text is too short (< 3)', () => {
      expect(() => controller.submitComment('12', 5)).toThrow('Invalid text length: must be between 3 and 300 characters');
    });

    it('should throw if text is too long (> 300)', () => {
      expect(() => controller.submitComment('a'.repeat(301), 5)).toThrow('Invalid text length: must be between 3 and 300 characters');
    });

    // Prohibited characters: ", ', ; . ( ) % and space
    const prohibited = ['"', "'", ';', '.', ' ', '(', ')', '%'];
    prohibited.forEach(char => {
      it(`should throw if text contains prohibited character: ${char}`, () => {
        expect(() => controller.submitComment(`abc${char}def`, 5)).toThrow('Invalid text: contains prohibited characters');
      });
    });

    // Invalid cases - security rating
    it('should throw if security rating is not a number', () => {
      expect(() => controller.submitComment('Valid', '5')).toThrow('Invalid security rating: must be an integer');
    });

    it('should throw if security rating is not an integer', () => {
      expect(() => controller.submitComment('Valid', 5.5)).toThrow('Invalid security rating: must be an integer');
    });

    it('should throw if security rating is NaN', () => {
      expect(() => controller.submitComment('Valid', NaN)).toThrow('Invalid security rating: must be an integer');
    });

    it('should throw if security rating is Infinity', () => {
      expect(() => controller.submitComment('Valid', Infinity)).toThrow('Invalid security rating: must be an integer');
    });

    it('should throw if security rating is null', () => {
      expect(() => controller.submitComment('Valid', null)).toThrow('Invalid security rating: must be an integer');
    });

    it('should return a comment with a valid timestamp', () => {
      const result = controller.submitComment('Valid', 5);
      expect(result.comment.timestamp).toBeInstanceOf(Date);
      expect(result.comment.timestamp.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it('should throw if security rating is < 1', () => {
      expect(() => controller.submitComment('Valid', 0)).toThrow('Invalid security rating: must be between 1 and 10');
    });

    it('should throw if security rating is > 10', () => {
      expect(() => controller.submitComment('Valid', 11)).toThrow('Invalid security rating: must be between 1 and 10');
    });
  });
});
