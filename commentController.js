class CommentController {
  constructor() {
    this.comments = [];
  }

  submitComment(text, securityRating) {
    if (typeof text !== 'string') {
      throw new Error('Invalid text: must be a string');
    }

    if (text.length < 3 || text.length > 300) {
      throw new Error('Invalid text length: must be between 3 and 300 characters');
    }

    // Prohibited characters: ", ', ; . ( ) % and space
    const prohibitedChars = /[",';. ()%]/;
    if (prohibitedChars.test(text)) {
      throw new Error('Invalid text: contains prohibited characters');
    }

    if (!Number.isInteger(securityRating)) {
      throw new Error('Invalid security rating: must be an integer');
    }

    if (securityRating < 1 || securityRating > 10) {
      throw new Error('Invalid security rating: must be between 1 and 10');
    }

    const comment = {
      text,
      securityRating,
      timestamp: new Date()
    };

    this.comments.push(comment);
    return { success: true, comment };
  }
}

module.exports = CommentController;
