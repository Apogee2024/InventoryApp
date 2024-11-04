export const getPaginatedItems = async (
    { page = 1, pageSize = 10 }: { page: number; pageSize: number },
    context: any
  ) => {
    const skip = (page - 1) * pageSize;
  
    // Query the database for the specified fields
    const items = await context.entities.Item.findMany({
      skip: skip,
      take: pageSize,
      select: {
        intPartNum: true,
        intName: true,
        quantity: true,
        sloc: true,
        reOrder: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  
    // Get the total count of items for pagination
    const totalItemsCount = await context.entities.Item.count();
  
    return {
      items,
      totalItems: totalItemsCount,
      totalPages: Math.ceil(totalItemsCount / pageSize)
    };
  };
  