import {
  createNameTarget,
  getNameTargets,
  findNameTarget
} from '../nameTargetModel';
import {
  connect,
  cleanData,
  cleanConnections
} from '../../__helper__/mongo.memory.server.test.helper';

const aNameTarget = (
  userId: string = 'user-123',
  title: string = 'A title',
  name: string = 'A name'
) => {
  return {
    userId,
    title,
    name
  };
};

describe('Name Target Model', () => {
  beforeAll(connect);
  beforeEach(cleanData);
  afterAll(cleanConnections);

  it('should fetch an empty list of name targets', async () => {
    const nameTargets = await getNameTargets();
    expect(nameTargets).toHaveLength(0);
  });

  it('should fetch a list with one name target', async () => {
    const existingNameTarget = await createNameTarget({
      userId: 'user-123',
      title: 'What is the name of my son',
      name: 'Grimur'
    });

    const nameTargets = await getNameTargets();

    expect(nameTargets).toContainEqual(
      expect.objectContaining({
        userId: 'user-123',
        title: 'What is the name of my son',
        name: 'Grimur',
        id: existingNameTarget.id,
        createdAt: existingNameTarget.createdAt
      })
    );
  });

  it('should fetch multiple name targets', async () => {
    await createNameTarget(aNameTarget());
    await createNameTarget(aNameTarget());

    const nameTargets = await getNameTargets();

    expect(nameTargets).toHaveLength(2);
  });

  it('should not find name target from illegal id', async () => {
    const nameTarget = await findNameTarget('123-123');
    expect(nameTarget).toBeNull();
  });

  it('should not find name target from legal id', async () => {
    const legalId = '63a8c45168a874a5cf5c3541';
    const nameTarget = await findNameTarget(legalId);
    expect(nameTarget).toBeNull();
  });

  it('should find name target', async () => {
    const existingNameTarget = await createNameTarget(aNameTarget());

    const nameTarget = await findNameTarget(existingNameTarget.id);

    expect(nameTarget).not.toBeNull();
    expect(nameTarget?.id).toEqual(existingNameTarget.id);
  });

  it('should not find name target', async () => {
    const existingNameTarget = await createNameTarget(aNameTarget());

    const nameTarget = await findNameTarget(existingNameTarget.id);

    expect(nameTarget).not.toBeNull();
    expect(nameTarget?.id).toEqual(existingNameTarget.id);
  });
});
