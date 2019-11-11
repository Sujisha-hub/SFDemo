trigger OpportunitySPCreation on Opportunity (after insert) {
    Set<Id> oppIds= new Set<Id>();
for(Opportunity ld:trigger.new){
    oppIds.add(ld.Id);        
    }
    List<Opportunity> oppList=[SELECT ID,Name,StageName,Amount FROM Opportunity WHERE Id IN: oppIds];
    for(Opportunity ld:oppList){
        SharePointOnlineWebserviceCallout.GetAuthentication(ld.Name, ld.Id, ld.StageName,'Opportunity',ld.Amount);
        //OpportunityUpdateSP.GetAuthentication(ld.Name, ld.Id, ld.StageName, ld.Amount);
    }
}