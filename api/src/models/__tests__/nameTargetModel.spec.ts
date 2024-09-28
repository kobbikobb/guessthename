import {
  createNameTarget,
  getNameTargets,
  findNameTarget
} from '../nameTargetModel';

describe('Name Target Model', () => {
  it('should create a name target', async () => {
    const nameTarget = await createNameTarget({
      userId: 'the-user-id',
      title: 'the title',
      name: 'the name'
    });

    expect(nameTarget).toEqual(
      expect.objectContaining({
        userId: 'the-user-id',
        title: 'the title',
        name: 'the name',
        id: expect.anything(),
        createdAt: expect.anything()
      })
    );
  });

  it('should fetch a list with a name target', async () => {
    const { id, createdAt } = await createNameTarget({
      userId: 'the-user-id',
      title: 'the title',
      name: 'the name'
    });

    const nameTargets = await getNameTargets();
    expect(nameTargets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: 'the-user-id',
          title: 'the title',
          name: 'the name',
          id,
          createdAt
        })
      ])
    );
  });

  it('should not find a name target when none exists using an invalid id', async () => {
    const nameTarget = await findNameTarget('invalid-id');
    expect(nameTarget).toBeNull();
  });

  it('should not find a name target when none exists using a valid id', async () => {
    const nameTarget = await findNameTarget('63ab164ed190f2346daafa31');
    expect(nameTarget).toBeNull();
  });

  it('should find a name target', async () => {
    const existingNameTarget = await createNameTarget({
      userId: 'the-user-id',
      title: 'the title',
      name: 'the name'
    });

    const nameTarget = await findNameTarget(existingNameTarget.id);
    expect(nameTarget).toEqual(
      expect.objectContaining({
        userId: 'the-user-id',
        title: 'the title',
        name: 'the name',
        id: existingNameTarget.id,
        createdAt: existingNameTarget.createdAt
      })
    );
  });
});
