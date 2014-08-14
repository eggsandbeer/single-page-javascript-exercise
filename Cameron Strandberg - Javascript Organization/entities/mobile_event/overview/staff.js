define(['app', 'backbone.memento'], function(QuickMobile){
    QuickMobile.module('Entities', function(Entities, QuickMobile, Backbone, Marionette, $, _){

        Entities.AssignedStaffModel = Backbone.Model.extend({
            initialize: function(){
                _.extend(this, new Backbone.Memento(this));
            },
            sync: function(method, model, options){
                // IE8/9 fix.
                if (!window.location.origin) {
                    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
                }

                var baseUrl = window.location.origin+'/qp-api/v1/master-app/'+model.get('col_id')+'/assigned-staff/';
                var config = {};

                switch(method){
                    case "create":
                        config = _.extend(config, {
                            method: "POST",
                            url: baseUrl,
                            data: JSON.stringify(model.pick(
                                "staff"
                            ))
                        });
                    break;
                    case "read":
                    break;
                    case "update":
                        config =_.extend({
                            method: "PUT",
                            url: baseUrl+model.get('id')
                        });
                    break;
                    case "delete":
                        config =_.extend({
                            method: "DELETE",
                            url: baseUrl+model.get('id')
                        });
                    break;
                };
                options = _.extend(options, config);

                return Backbone.Model.prototype.sync.call(this, method, model, options);
            }
        });

        Entities.AssignedStaffCollection = Backbone.Collection.extend({
            initialize: function(options){
                var memento = new Backbone.Memento(this);
                _.extend(this, memento);
                this.id = options.id;
            },
            urlRoot: function(){
                return window.location.origin;
            },
            url: function(){
                return '/qp-api/v1/master-app/'+this.id+'/assigned-staff'
            },
            parse: function(response){
                // _.each(response.body.agents, function(value, key, list){
                //     response.body.agents[key].functions = response.body.functions
                // });

                return response.body.staff;
            },
            model: Entities.AssignedStaffModel
        });


        Entities.UnAssignedStaffModel = Backbone.Model.extend({
            initialize: function(options){
                var memento = new Backbone.Memento(this);
                _.extend(this, memento);
            },
            sync: function(method, model, options){
                // IE8/9 fix.
                if (!window.location.origin) {
                    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
                }
                var baseUrl = window.location.origin+'/qp-api/v1/master-app/'+model.get('col_id')+'/available-staff';
                var config = {};

                switch(method){
                    case "create":
                        config = _.extend(config, {
                            method: "POST",
                            url: baseUrl,
                            data: JSON.stringify(model.pick(
                                "username", "fullname", "role", "password", "verifypassword"
                            ))
                        });
                    break;
                    case "read":
                    break;
                    case "update":
                        config =_.extend({
                            method: "PUT",
                            url: baseUrl+model.get('id')
                        });
                    break;
                    case "delete":
                        config =_.extend({
                            method: "DELETE",
                            url: baseUrl+model.get('id')
                        });
                    break;
                };
                options = _.extend(options, config);

                return Backbone.Model.prototype.sync.call(this, method, model, options);
            },
            validate: function(attrs, options){
                var errors = {};

                if (! attrs.username){
                    errors.username = 'This field cannot be blank';
                }
                if (! attrs.fullname){
                    errors.fullname = 'This field cannot be blank';
                }
                if (! attrs.password){
                    errors.password = 'This field cannot be blank';
                }
                if (! attrs.verifypassword){
                    errors.verifypassword = 'This field cannot be blank';
                }
                if (attrs.password !== attrs.verifypassword){
                    errors.password = 'Your passwords must match';
                    errors.verifypassword = 'Your passwords must match';
                }
                if (! _.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        Entities.UnAssignedStaffCollection = Backbone.Collection.extend({
            initialize: function(options){
                var memento = new Backbone.Memento(this);
                _.extend(this, memento);
                this.id = options.id;
            },
            urlRoot: function(){
                return window.location.origin;
            },
            url: function(){
                return '/qp-api/v1/master-app/'+this.id+'/available-staff'
            },
            parse: function(response){
                if (response.body.staff.length === 0){
                    response.body.staff[0] = {};
                    response.body.staff[0].nostaff = true;
                }
                return response.body.staff;

            },
            model: Entities.UnAssignedStaffModel
        });

        var API = {
            getAssignedStaff: function(appId){
                var staff = new Entities.AssignedStaffCollection({id: appId}),
                    defer = $.Deferred();

                staff.fetch({
                    success: function(data){
                        defer.resolve(data);
                    },
                    error: function(data){
                        defer.resolve(data);
                    }
                });
                return defer.promise();
            },
            getUnAssignedStaff: function(appId){
                var unassignedstaff = new Entities.UnAssignedStaffCollection({id: appId}),
                    defer = $.Deferred();

                unassignedstaff.fetch({
                    success: function(data){
                        defer.resolve(data);
                    },
                    error: function(data){
                        defer.resolve(data);
                    }
                });
                return defer.promise();
            },
            getNewUnAssignedStaff: function(id){
                var newunassignedstaffer = new Entities.UnAssignedStaffModel();

                $.ajax({
                  url: window.location.origin+'/qp-api/v1/master-app/'+id+'/available-staff',
                  type: 'get',
                  success: function (data, status) {
                    newunassignedstaffer.set('roles', data.body.roles)

                  },
                  error: function (xhr, desc, err) {
                    console.log(xhr);
                  }
                });
                return newunassignedstaffer;
            }
        }

        QuickMobile.reqres.setHandler("assignedstaff:entities", function(id){
            return API.getAssignedStaff(id);
        });

        QuickMobile.reqres.setHandler("assignedstaff:entity:new", function(id){
            return new Entities.AssignedStaffModel();
        });

        QuickMobile.reqres.setHandler("unassignedstaff:entities", function(id){
            return API.getUnAssignedStaff(id);
        });

        QuickMobile.reqres.setHandler("newunassignedstaff:entities", function(id){
            return API.getNewUnAssignedStaff(id)
        });

    });
    return;
});
