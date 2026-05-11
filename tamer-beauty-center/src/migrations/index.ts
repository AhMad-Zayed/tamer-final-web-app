import * as migration_20260509_191919_sync_services_schema from './20260509_191919_sync_services_schema';
import * as migration_20260510_181109_init_store from './20260510_181109_init_store';
import * as migration_20260510_183021_add_shipping from './20260510_183021_add_shipping';

export const migrations = [
  {
    up: migration_20260509_191919_sync_services_schema.up,
    down: migration_20260509_191919_sync_services_schema.down,
    name: '20260509_191919_sync_services_schema',
  },
  {
    up: migration_20260510_181109_init_store.up,
    down: migration_20260510_181109_init_store.down,
    name: '20260510_181109_init_store',
  },
  {
    up: migration_20260510_183021_add_shipping.up,
    down: migration_20260510_183021_add_shipping.down,
    name: '20260510_183021_add_shipping'
  },
];
