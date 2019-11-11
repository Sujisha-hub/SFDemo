@isTest
public class TestOpportunityClosure {
    static testMethod void SaveOpportunityPath(){
        Date dt= system.today();
        Opportunity opportunity = new Opportunity();
        opportunity.Name='Dorothy Romer';
        opportunity.Amount=125000;
        opportunity.CloseDate=dt.addDays(15);
        opportunity.StageName='1. Gathering Needs';
        Upsert opportunity;
               
        Closure_Stage__c closureStage = new Closure_Stage__c();
        closureStage.Closed_On__c = 'Apr - 2018';
        closureStage.Closure_Date__c = date.newInstance(2018, 04, 12);
        closureStage.Opportunity__c=opportunity.Id;
        closureStage.Closure_Amount__c=1000;
        Upsert closureStage;
        
        //OpportunityUpdate.SaveOpportunityPath(opportunity.Id, '2. Prospecting Options');
        system.assertEquals(true, OpportunityUpdate.SaveOpportunityPath(opportunity.Id, '2. Prospecting Options'));
        system.assertEquals(null, OpportunityUpdate.SaveOpportunityPath('0061U000005RERnQA1', '2. Prospecting Options'));//Exception log
        //OpportunityUpdate.SaveOpportunityPath(opportunity.Id, '1. Gathering Needs');
        //OpportunityUpdate.SaveOpportunityPath(opportunity.Id, '5. Negotiation');
        //OpportunityUpdate.SaveOpportunityPath(opportunity.Id, 'dNegotiation');
        system.assertEquals(true, OpportunityUpdate.SaveOpportunityPath(opportunity.Id, '1. Gathering Needs'));
        system.assertEquals(true, OpportunityUpdate.SaveOpportunityPath(opportunity.Id, '5. Negotiation'));
        system.assertEquals(null, OpportunityUpdate.SaveOpportunityPath(opportunity.Id, 'dNegotiation'));
        
        
        system.assertEquals(true, OpportunityUpdate.SaveOpportunity(opportunity.Id, 'Awaiting Closure', '2019-08-28', 15000));
        system.assertEquals(null, OpportunityUpdate.SaveOpportunity(opportunity.Id, 'Awaiting Closure', '2019-28-28', 15000));//exception log
        system.assertEquals(true, OpportunityUpdate.SaveOpportunity(opportunity.Id, 'Awaiting Closure', '2019-09-28', 1000));
        system.assertEquals(true, OpportunityUpdate.SaveOpportunity(opportunity.Id, 'Awaiting Closure', '2019-10-28', 1000));
        system.assertEquals(true, OpportunityUpdate.SaveOpportunity(opportunity.Id, 'Closed Won', '2019-08-28', 15000));
        
        
        system.assertNotEquals(null, OpportunityUpdate.LoadOppClosureStages(opportunity.Id));
        system.assertNotEquals(null, OpportunityUpdate.LoadClosureDetails(opportunity.Id));
        system.assertNotEquals(null, OpportunityUpdate.LoadStagePaths(opportunity.Id));
        system.assertNotEquals(null, OpportunityUpdate.GetClosureDetail(opportunity.Id,'Apr - 2018'));
        system.assertNotEquals(null, OpportunityUpdate.GetClosureDetails(opportunity.Id));
        //OpportunityUpdate.SaveOpportunity(opportunity.Id, 'Closed Won', '2019-08-28', 15000);
        //OpportunityUpdate.SaveOpportunity(opportunity.Id, 'Awaiting Closure', '2019-08-28', 15000);
        //OpportunityUpdate.SaveOpportunity(opportunity.Id, 'Awaiting Closure', '2019-09-28', 1000);
        //OpportunityUpdate.SaveOpportunity(opportunity.Id, 'Awaiting Closure', '2019-10-28', 1000);
        //OpportunityUpdate.LoadOppClosureStages(opportunity.Id);
        //OpportunityUpdate.LoadClosureDetails(opportunity.Id);
        //OpportunityUpdate.LoadStagePaths(opportunity.Id);
        //OpportunityUpdate.GetClosureDetail(opportunity.Id, 'Aug');
        //OpportunityUpdate.GetClosureDetails(opportunity.Id);
    }
}