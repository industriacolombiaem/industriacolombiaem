import type { Schema, Struct } from '@strapi/strapi';

export interface CommonSpecification extends Struct.ComponentSchema {
  collectionName: 'components_common_specifications';
  info: {
    description: 'Key-value specification pair for products';
    displayName: 'Specification';
    icon: 'bulletList';
  };
  attributes: {
    key: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.specification': CommonSpecification;
    }
  }
}
