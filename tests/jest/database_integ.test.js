const dq = require('../../database/direct_query');


test('Confirming database initialized / connection and query valid', async () => {
    const obj = await dq.retrieveArticleObj('Article Title');
    const pars = await dq.retrieveParagraphs(obj);
    const len = pars.length;
    expect(len).toBe(2);
});
