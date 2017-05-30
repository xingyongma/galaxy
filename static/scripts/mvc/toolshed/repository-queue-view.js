define(["mvc/toolshed/toolshed-model","mvc/toolshed/util"],function(a,b){var c=Backbone.View.extend({el:"#center",defaults:[{}],initialize:function(){var b=this;this.model=new a.RepoQueue,this.listenTo(this.model,"sync",this.render),this.model.fetch(),b.render()},render:function(){var a=this,c=a.templateRepoQueue,d=a.model.models;a.$el.html(c({title:"Repository Installation Queue",repositories:d,queue:b.queueLength()})),$("#center").css("overflow","auto"),a.bindEvents()},bindEvents:function(){var a=this;$(".install_one").on("click",function(){var b=a.loadFromQueue($(this).attr("data-repokey"));a.installFromQueue(b,$(this).attr("data-repokey"))}),$(".remove_one").on("click",function(){var a=$(this).attr("data-repokey"),b=JSON.parse(localStorage.repositories);if(b.hasOwnProperty(a)){var c=b[a].repository.id;delete b[a],$("#queued_repository_"+c).remove()}localStorage.repositories=JSON.stringify(b)}),$("#clear_queue").on("click",function(){localStorage.repositories="{}"}),$("#from_workflow").on("click",function(){Backbone.history.navigate("workflows",{trigger:!0,replace:!0})})},installFromQueue:function(a,c){var d=Object();d.install_tool_dependencies=a.install_tool_dependencies,d.install_repository_dependencies=a.install_repository_dependencies,d.install_resolver_dependencies=a.install_resolver_dependencies,d.tool_panel_section=a.tool_panel_section,d.shed_tool_conf=a.shed_tool_conf,d.repositories=JSON.stringify([[a.repository.id,a.changeset_revision]]),d.tool_shed_repository_ids=JSON.stringify([a.repository.id]),d.tool_shed_url=c.split("|")[0],d.changeset=a.changeset_revision;var e=Galaxy.root+"api/tool_shed_repositories/install?async=True";$("#queued_repository_"+a.repository.id).remove(),localStorage.repositories&&(void 0===c&&(c=b.queueKey(a)),repository_queue=JSON.parse(localStorage.repositories),repository_queue.hasOwnProperty(c)&&(delete repository_queue[c],localStorage.repositories=JSON.stringify(repository_queue))),$.post(e,d,function(a){var b=JSON.parse(a),c=b.repositories,d="status/r/"+c.join("|");$.post(Galaxy.root+"admin_toolshed/manage_repositories",b,function(){console.log("Initializing repository installation succeeded")}),Backbone.history.navigate(d,{trigger:!0,replace:!0})})},loadFromQueue:function(a){return repository_queue=JSON.parse(localStorage.repositories),repository_queue.hasOwnProperty(a)?repository_queue[a]:void 0},reDraw:function(a){this.$el.empty(),this.initialize(a),this.model.fetch(),this.render(a)},templateRepoQueue:_.template(['<div class="unified-panel-header" id="panel_header" unselectable="on">','<div class="unified-panel-header-inner"><%= title %></div>','<div class="unified-panel-header-inner" style="position: absolute; right: 5px; top: 0px;"><a href="#/queue">Repository Queue (<%= queue %>)</a></div>',"</div>",'<div class="tab-pane" id="panel_header" id="repository_queue">','<table id="queued_repositories" class="grid" border="0" cellpadding="2" cellspacing="2" width="100%">','<thead id="grid-table-header">',"<tr>",'<th class="datasetRow">Name</th>','<th class="datasetRow">Owner</th>','<th class="datasetRow">Revision</th>','<th class="datasetRow">ToolShed</th>','<th class="datasetRow">Install</th>','<th class="datasetRow"><input class="btn btn-primary" type="submit" id="clear_queue" name="clear_queue" value="Clear queue" /></th>',"</tr>","</thead>","<tbody>","<% _.each(repositories, function(repository) { %>",'<tr id="queued_repository_<%= repository.get("id") %>">','<td class="datasetRow"><%= repository.get("repository").name %></td>','<td class="datasetRow"><%= repository.get("repository").owner %></td>','<td class="datasetRow"><%= repository.get("changeset_revision") %></td>','<td class="datasetRow"><%= repository.get("tool_shed_url") %></td>','<td class="datasetRow">','<input class="btn btn-primary install_one" data-repokey="<%= repository.get("queue_key") %>" type="submit" id="install_repository_<%= repository.get("id") %>" name="install_repository" value="Install now" />',"</td>",'<td class="datasetRow">','<input class="btn btn-primary remove_one" data-repokey="<%= repository.get("queue_key") %>" type="submit" id="unqueue_repository_<%= repository.get("id") %>" name="unqueue_repository" value="Remove from queue" />',"</td>","</tr>","<% }); %>","</tbody>","</table>",'<input type="button" class="btn btn-primary" id="from_workflow" value="Add from workflow" />',"</div>"].join(""))});return{RepoQueueView:c}});
//# sourceMappingURL=../../../maps/mvc/toolshed/repository-queue-view.js.map