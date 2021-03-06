import Route from 'consul-ui/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { get } from '@ember/object';

import WithAclActions from 'consul-ui/mixins/acl/with-actions';

export default Route.extend(WithAclActions, {
  templateName: 'dc/acls/edit',
  repo: service('repository/acl'),
  beforeModel: function() {
    this.repo.invalidate();
  },
  model: function(params) {
    this.item = this.repo.create({
      Datacenter: this.modelFor('dc').dc.Name,
    });
    return hash({
      create: true,
      item: this.item,
      types: ['management', 'client'],
    });
  },
  setupController: function(controller, model) {
    this._super(...arguments);
    controller.setProperties(model);
  },
  deactivate: function() {
    if (get(this.item, 'isNew')) {
      this.item.destroyRecord();
    }
  },
});
