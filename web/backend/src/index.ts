import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * Seeds public API permissions for Product and Category content types,
   * so the frontend can fetch catalog data without authentication.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi
      .db.query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      strapi.log.warn(
        'Public role not found — skip permission seeding. ' +
        'This is normal on the very first start before admin registration.'
      );
      return;
    }

    const requiredActions = [
      'api::product.product.find',
      'api::product.product.findOne',
      'api::category.category.find',
      'api::category.category.findOne',
    ];

    const existingPermissions = await strapi
      .db.query('plugin::users-permissions.permission')
      .findMany({
        where: {
          role: publicRole.id,
          action: { $in: requiredActions },
        },
      });

    const existingActions = existingPermissions.map((p: any) => p.action);
    const newActions = requiredActions.filter(
      (action) => !existingActions.includes(action)
    );

    if (newActions.length === 0) {
      strapi.log.info('Public API permissions already exist. No changes needed.');
      return;
    }

    for (const action of newActions) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action,
          role: publicRole.id,
        },
      });
    }

    strapi.log.info(
      `Permissions seeded: ${newActions.join(', ')}`
    );
  },
};