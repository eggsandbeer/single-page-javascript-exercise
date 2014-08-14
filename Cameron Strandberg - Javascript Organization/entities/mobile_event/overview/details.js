define(['app', 'backbone.memento'], function(QuickMobile){
    QuickMobile.module('Entities', function(Entities, QuickMobile, Backbone, Marionette, $, _){
        Entities.Details = Backbone.Model.extend({
            initialize: function(options){
                var memento = new Backbone.Memento(this);
                _.extend(this, memento);
                this.id = options.id;
            },
            urlRoot: function(){
                if (!window.location.origin) {
                    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
                }
                return window.location.origin
            },
            url: function(){
                return '/qp-api/v1/master-app/'+this.id+'/details'
            },
            parse: function(response){
                return response.body;
            },
            defaults: {
                projectName: 'Rufus The Dog',
                projectStatus: 'released',
                type: 'Mobile Event',
                applicationId: 100,
                numberAttendees: 100,
                selectedTimeZone: '-09:00=-540=Alaska; Eastern Aleutian Islands=was Yukon timezone',
                timeZones: [
                    '-12:00=-720=Eniwelok, Kwajalein',
                    '-11:00=-660=Midway Island, Samoa',
                    '-10:30=-630=Cook Islands',
                    '-10:00=-600=Hawaii; Western Aleutian Islands=was Alaska/Hawaii timezone',
                    '-09:30=-570=Marquesas Islands',
                    '-09:00=-540=Alaska; Eastern Aleutian Islands=was Yukon timezone',
                    '-08:30=-510=Pitcairn Island',
                    '-08:00=-480=Pacific Time (US & Canada); Yukon; Tijuana',
                    '-07:00=-420=Mountain Time (US & Canada)',
                    '-06:00=-360=Central Time (US & Canada); Mexico City, Tegucigalpa',
                    '-05:00=-300=Eastern Time (US & Canada); Bogota; Lima; Quito',
                    '-04:30=-270=Caracas',
                    '-04:00=-240=Atlantic Time (Canada); Caracas, La Paz; Santiago',
                    '-03:45=-225=Guyana, South America',
                    '-03:30=-210=Newfoundland; Suriname, South America',
                    '-03:00=-180=Greenland; Brasilia; Buernos Aires; Puerto Rico',
                    '-02:00=-120=Mid-Atlantic',
                    '-01:00=-60=Azores, Cape Verde Is.',
                    '00:00=0=Greenwich Mean Time',
                    '01:00=60=Amsterdam; Berlin; Bern; Rome; Stockholm; Vienna',
                    '02:00=120=Athens; Istanbul; Minsk; Jerusalem',
                    '03:00=180=Baghdad; Kuwait; Moscow',
                    '03:30=210=Tehran, Iran',
                    '04:00=240=Abu Dhabi; Muscat',
                    '04:30=270=Kabul, Afghanistan',
                    '05:00=300=Ekaterinburg',
                    '05:30=330=India; Bombay; Calcutta; New Delhi; Sri Lanka',
                    '05:45=345=Kathmandu, Nepal',
                    '06:00=360=Astana; Dhaka',
                    '06:30=390=Cocos Islands; Yangon; Myanmar',
                    '07:00=420=Bangkok; Hanoi',
                    '08:00=480=Perth; Singapore; China',
                    '08:45=525=South Australia',
                    '09:00=540=Osaka; Tokyo; Seoul',
                    '09:30=570=Northern Australia',
                    '10:00=600=Brisbane; Canberra; Sydney; Guam',
                    '11:00=660=Magadan; Solomon Is.; New Caledonia',
                    '11:30=690=New Zealand?; Norfold Island, Australia',
                    '12:00=720=Auckland; Wellington; Fiji; Marshall Is.; Tuvalu',
                    '12:45=765=Chatham Island, New Zealand',
                    '13:00=780=Nukulalofa; Phoenix Islands=1 hour EAST of the dateline',
                    '14:00=840=Line Islands; Christmas Islands=2 hours EAST of the dateline'
                ],
                startDate: "01-10-2014",
                endDate: "03-10-2014",
                releaseDate: '02-14-2014',
                activationDate: '02-13-2014',
                expiryDate: '02-13-2014',
                mobile_eventVersion: '2.0',
                maxQEPermitted: '342',
                quickEvents: '1',
                quickEvents: '3'
            },
            validate: function(attrs, options){
                var errors = {};

                if (! attrs.Name){
                    errors.Name = 'This field cannot be blank';
                }
                if (! attrs.size){
                    errors.size = 'This field cannot be blank';
                }
                if (isNaN(attrs.size) === true){
                    errors.size = 'This value must be a number';
                }
                if (isNaN(attrs.maxQEPermitted) === true){
                    errors.maxQEPermitted = 'This value must be a number';
                }
                if (! attrs.effectiveDate){
                    errors.effectiveDate = 'This field cannot be blank';
                }
                if (! attrs.activationDate){
                    errors.activationDate = 'This field cannot be blank';
                }
                if (! attrs.expiryDate){
                    errors.expiryDate = 'This field cannot be blank';
                }
                if (! _.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        var API = {
            getDetailsEntity: function(detailsId){
                var contact = new Entities.Details({ id: detailsId }),
                    defer = $.Deferred();

                contact.fetch({
                    success: function(data){
                        defer.resolve(data);
                    },
                    error: function(data){
                        defer.resolve(data);
                    }
                });

                return defer.promise();
            }
        }

        QuickMobile.reqres.setHandler("details:entity", function(id){
            return API.getDetailsEntity(id);
        });

    });
    return;
});
