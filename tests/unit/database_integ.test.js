const dq = require('../../database/direct_query');


test('Confirming database initialized / connection and query valid.', async () => {
    const obj = await dq.retrieveArticleObj("This-year's-WEF-meeting-draws-to-a-close");
    const pars = await dq.retrieveParagraphs(obj);
    const len = pars.length;
    expect(len).toBe(6);
});


test('Confirming database search functionality / tags working as intended', async () => {
    const result = await dq.retrieveSearchData('Poland');
    const len = result.length;
    expect(len).not.toBe(0);
});


test('Confirming homepage feature function working as intended.', async () => {
    const result = await dq.retrieveFeaturedDocuments();
    const len = result.length;
    // console.log(result);
    expect(len).toBe(2);
});
