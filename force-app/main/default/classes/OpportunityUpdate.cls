public class OpportunityUpdate {
    
    @AuraEnabled//Annotation to use method in lightning component
    //method to save the opportunity path 
    public static Boolean SaveOpportunityPath(string recordId,string stage) {
        try{
            Opportunity opp = new Opportunity();
            Integer stageIndex=0;
            opp.Id=recordId;
            List<String> opportunityPaths=new List<String>{'Gathering Needs','Prospecting Options','Verbal Interest','Sent Proposal','Negotiation','Closed Won','Close','Closed Lost'}; 
                string oppCurrentStage=[SELECT StageName FROM Opportunity WHERE Id=:recordId].StageName;
            List<String> oppStages=LoadStagePaths(recordId);
            stageIndex=oppStages.indexOf(stage);
            if(stage==oppCurrentStage)
            {
                opp.StageName=oppStages[stageIndex+1];
            } 
            else
            {
                opp.StageName=oppStages[stageIndex];
            }
            if(stage=='Negotiation'){
                opp.StageName='Close';
            }
            if(!(opportunityPaths.indexOf(stage)> -1)){
                opp.StageName='Awaiting Closure';
            }
            upsert opp;
            return true;    
        }
        catch(Exception Ex)
        {
            ApexException.logExceptions(Ex);     
            return null;
        } 
    }
    @AuraEnabled//Annotation to use method in lightning component
    //method to save opportunity path with closure stages
    public static Boolean SaveOpportunity(string recordId,string oppStage,String oppDate,Decimal closureAmount) {
        try{
            string stageName='';
            Date closeDate=Date.valueOf(oppDate);
            String monthName='';
            Opportunity opp = new Opportunity();
            opp.Id=recordId;
            if(oppStage=='Awaiting Closure')
            {
                Integer day = closeDate.day();
                Integer month = closeDate.month();
                Integer year = closeDate.year();
                DateTime dt= DateTime.newInstance(year, month, day); 
                monthName=dt.format('MMM');
                stageName='Closed On '+monthName+'-'+dt.format('dd');           
                Closure_Stage__c cs = new Closure_Stage__c();
                cs.Closed_On__c=stageName;
                cs.Closure_Amount__c=closureAmount;
                cs.Closure_Date__c=Date.valueOf(oppDate);
                cs.Opportunity__c=opp.Id;
                insert cs;
            }  
            else
            {
                stageName=oppStage;
            }        
            opp.CloseDate=Date.valueOf(oppDate);
            opp.StageName=oppStage;
            upsert opp;
            
            return true;
        }
        catch(Exception Ex)
        {
            ApexException.logExceptions(Ex);     
            return null;
        } 
    }
    @AuraEnabled//Annotation to use method in lightning component
    //method to load opportunity path details related with closure stage
    public static sObject[] LoadOppClosureStages(string recordId) {
        string stageName='';
        sObject[] result=null;
        Opportunity[] opp=[SELECT StageName FROM Opportunity Where Id=:recordId];
        if(opp.size()>0)
        {
            stageName=opp[0].StageName;
            result=opp;
            if(stageName=='Awaiting Closure'){
                Closure_Stage__c[] closureStages=[SELECT Closed_On__c,Closure_Date__c FROM Closure_Stage__c WHERE Opportunity__c=:recordId order by CreatedDate Asc];
                result=closureStages;
            }
        }
        return result;        
    }
    @AuraEnabled//Annotation to use method in lightning component
    //method to retrive closure stages of the opportunity
    public static sObject[] LoadClosureDetails(string recordId) {
        string stageName='';
        sObject[] result=null;
        Closure_Stage__c[] closureStages=[SELECT Closed_On__c,Closure_Date__c FROM Closure_Stage__c WHERE Opportunity__c=:recordId order by CreatedDate Asc];
        if(closureStages.size()>0)
        {
            result=closureStages;
        }        
        return result;       
    }
    @AuraEnabled
    //load opportunity and closure stages
    public static List<String> LoadStagePaths(string recordId){ 
        List<String> options = new List<String>();
        Schema.DescribeFieldResult fieldResult = Opportunity.StageName.getDescribe();
        List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
        Closure_Stage__c[] closureStages=[SELECT Closed_On__c,Closure_Date__c FROM Closure_Stage__c WHERE Opportunity__c=:recordId order by CreatedDate Asc];
        for (Schema.PicklistEntry p: pList) {
            if(p.getLabel()!='Awaiting Closure'){
                options.add(p.getLabel());
            }
            else{
                if(closureStages.size()>0)
                {
                    for(Closure_Stage__c cs: closureStages){
                        options.add(cs.Closed_On__c);
                    }
                }
            }
            
        }
        return options;   
    }
    @AuraEnabled//Annotation to use method in lightning component
    //retrive closure stage details of the closure month
    public static Closure_Stage__c GetClosureDetail(string recordId,string closureMonth){
        Closure_Stage__c result= new Closure_Stage__c();
        Closure_Stage__c[] closureStage=[SELECT Id,Closure_Date__c,Closure_Amount__c FROM Closure_Stage__c WHERE Opportunity__c=:recordId AND Closed_On__c=:closureMonth order by CreatedDate Asc];
        if(closureStage.size()>0){            
            result=closureStage[0];
            return result;
        }
        return null;
    }
    
    @AuraEnabled//Annotation to use method in lightning component
    //retrive closure stage details of the closure month
    public static List<Decimal> GetClosureDetails(string recordId) {
        try{
            List<Decimal> result=new List<Decimal>();
            Decimal totalSum = 0;
            Decimal opportunityAmount = 0;
            opportunityAmount= [SELECT Amount FROM Opportunity WHERE Id=:recordId].Amount;
            Closure_Stage__c[] closureStages=[SELECT Closed_On__c,Closure_Date__c,Closure_Amount__c,Opportunity__r.Amount FROM Closure_Stage__c WHERE Opportunity__c=:recordId order by CreatedDate Asc];
            for (Closure_Stage__c cs: closureStages) {
                totalSum=totalSum+cs.Closure_Amount__c;
            }        
            result.add(totalSum);
            result.add(opportunityAmount);
            return result;    
        }
        catch(Exception Ex)
        {
            ApexException.logExceptions(Ex);     
            return null;
        } 
    }
}