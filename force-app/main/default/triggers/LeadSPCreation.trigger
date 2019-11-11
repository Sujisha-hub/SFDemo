trigger LeadSPCreation on Lead (after insert) {
    Set<Id> LeadIds= new Set<Id>();
    for(Lead ld:trigger.new){
        LeadIds.add(ld.Id);       
    }
    List<Lead> LeadList=[SELECT ID,Name,Status FROM Lead WHERE Id IN: LeadIds];
    for(Lead ld:LeadList){
        SharePointOnlineWebserviceCallout.GetAuthentication(ld.Name, ld.Id, ld.Status,'Lead',0);
    }
}