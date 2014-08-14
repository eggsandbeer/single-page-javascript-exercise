define([
    'app',
    'hbs!apps/common/breadcrumbs/list/templates/breadcrumb',
    'hbs!apps/common/breadcrumbs/list/templates/container'
    ],
function(QuickMobile, BreadcrumbTpl, ContainerTpl){
    QuickMobile.module('Breadcrumbs.List.View', function(View, ContactManager, Backbone, Marionette, $, _){
        View.Header = Marionette.ItemView.extend({
            template: BreadcrumbTpl,
            tagName: 'li',
            events: {
                'click a': 'navigate'
            },
            navigate: function(e){
                e.preventDefault();
                this.trigger('navigate', this.model);
            },
            onRender: function(){
                if(this.model.selected){
                    this.$el.addClass('active');
                }
            }
        });

        View.Headers = Marionette.CompositeView.extend({
            template: ContainerTpl,
            tagName: 'div',
            className: 'row-fluid',
            itemView: View.Header,
            itemViewContainer: 'ul'
        });
    });
    return QuickMobile.Breadcrumbs.List.View;
});

