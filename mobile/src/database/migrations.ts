import {schemaMigrations} from '@nozbe/watermelondb/Schema/migrations';

export const migrations = schemaMigrations({
  migrations: [
    // Example migration (uncomment and modify as needed)
    // {
    //   toVersion: 2,
    //   steps: [
    //     addColumns({
    //       table: 'users',
    //       columns: [
    //         { name: 'phone', type: 'string', isOptional: true },
    //       ],
    //     }),
    //   ],
    // },
  ],
});
