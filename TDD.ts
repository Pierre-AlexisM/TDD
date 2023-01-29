import { Documents } from './documents';

describe('Documents', () => {
  let documents: Documents;

  beforeEach(() => {
    documents = new Documents();
  });

  test('should sort documents by name', () => {
    documents.add({ name: 'c', content: 'content' });
    documents.add({ name: 'a', content: 'content' });
    documents.add({ name: 'b', content: 'content' });

    expect(documents.list()).toEqual([
      { name: 'a', content: 'content' },
      { name: 'b', content: 'content' },
      { name: 'c', content: 'content' },
    ]);
  });

  test('should download document', () => {
    const spy = jest.spyOn(documents, 'download');
    documents.add({ name: 'a', content: 'content' });
    documents.download('a');

    expect(spy).toHaveBeenCalledWith('a');
  });

  test('should add document', () => {
    documents.add({ name: 'a', content: 'content' });
    expect(documents.list()).toContainEqual({ name: 'a', content: 'content' });
  });

  test('should remove document', () => {
    documents.add({ name: 'a', content: 'content' });
    documents.remove('a');
    expect(documents.list()).not.toContainEqual({ name: 'a', content: 'content' });
  });

  test('should rename document', () => {
    documents.add({ name: 'a', content: 'content' });
    documents.rename('a', 'b');
    expect(documents.list()).toContainEqual({ name: 'b', content: 'content' });
    expect(documents.list()).not.toContainEqual({ name: 'a', content: 'content' });
  });

  test('should move document', () => {
    documents.add({ name: 'a', content: 'content' });
    const spy = jest.spyOn(documents, 'move');
    documents.move('a', 'dest');
    expect(spy).toHaveBeenCalledWith('a', 'dest');
  });
});
