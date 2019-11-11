({
    //apply CSS based on the current opportunity path is selected
    PathSelection : function(component, event, helper) {
        var stepName=component.get("v.selectedStage");
        var opportunityStage=component.get("v.opportunityStage");
        var liGatheringNeeds=component.find("liGatheringNeeds");
        var liProspectingOptions=component.find("liProspectingOptions");
        var liVerbalInterest=component.find("liVerbalInterest");
        var liSentProposal=component.find("liSentProposal");
        var liNegotiation=component.find("liNegotiation");
        var liClose=component.find("liClose");
        var liCloseWon=component.find("liCloseWon");
        var liCloseLost=component.find("liCloseLost");
        var oppStages=component.get("v.opportunityStages");
        var liClosureStage=document.getElementById(stepName);
        var liClosureStages=component.find("liClosureStages");
        switch(stepName){
            case "Gathering Needs":
                $A.util.addClass(liGatheringNeeds, "slds-is-active");
                $A.util.removeClass(liProspectingOptions, "slds-is-active");
                $A.util.removeClass(liVerbalInterest, "slds-is-active");
                $A.util.removeClass(liSentProposal, "slds-is-active");
                $A.util.removeClass(liNegotiation, "slds-is-active");
                $A.util.removeClass(liClose, "slds-is-active");
                $A.util.removeClass(liClosureStages, "slds-is-active");
                for(var i=0;i< oppStages.length;i++){
                    var oppClosureStage=document.getElementById(oppStages[i]);
                    $A.util.removeClass(oppClosureStage, "slds-is-active");
                }
                if(opportunityStage=="Gathering Needs")
                {
                    $A.util.removeClass(liGatheringNeeds, "slds-is-complete");
                    $A.util.addClass(liGatheringNeeds, "slds-is-current");
                    $A.util.addClass(liProspectingOptions, "slds-is-incomplete");
                    $A.util.addClass(liSentProposal, "slds-is-incomplete");
                    $A.util.addClass(liVerbalInterest, "slds-is-incomplete");
                    $A.util.addClass(liNegotiation, "slds-is-incomplete");
                    $A.util.addClass(liClose, "slds-is-incomplete");
                    $A.util.removeClass(liProspectingOptions, "slds-is-complete");
                    $A.util.removeClass(liSentProposal, "slds-is-complete");
                    $A.util.removeClass(liVerbalInterest, "slds-is-complete");
                    $A.util.removeClass(liNegotiation, "slds-is-complete");
                    $A.util.removeClass(liClose, "slds-is-complete");                    
                    $A.util.removeClass(liClosureStages, "slds-is-current");
                    $A.util.addClass(liClosureStages, "slds-is-incomplete");
                    for(var i=0;i< oppStages.length;i++){
                        var oppClosureStage=document.getElementById(oppStages[i]);
                        $A.util.removeClass(oppClosureStage, "slds-is-active");
                        $A.util.removeClass(oppClosureStage, "slds-is-complete");
                        $A.util.addClass(oppClosureStage, "slds-is-incomplete");
                    }
                }
                break;
            case "Prospecting Options":
                $A.util.removeClass(liGatheringNeeds, "slds-is-active");
                $A.util.addClass(liProspectingOptions, "slds-is-active");
                $A.util.removeClass(liVerbalInterest, "slds-is-active");
                $A.util.removeClass(liSentProposal, "slds-is-active");
                $A.util.removeClass(liNegotiation, "slds-is-active");
                $A.util.removeClass(liClose, "slds-is-active");
                $A.util.removeClass(liClosureStages, "slds-is-active");
                for(var i=0;i< oppStages.length;i++){
                    var oppClosureStage=document.getElementById(oppStages[i]);
                    $A.util.removeClass(oppClosureStage, "slds-is-active");
                }
                if (opportunityStage =="Prospecting Options")
                {    
                    $A.util.removeClass(liProspectingOptions, "slds-is-complete");
                    $A.util.addClass(liGatheringNeeds, "slds-is-complete");
                    $A.util.addClass(liProspectingOptions, "slds-is-current");
                    $A.util.addClass(liVerbalInterest, "slds-is-incomplete");
                    $A.util.addClass(liSentProposal, "slds-is-incomplete");
                    $A.util.addClass(liNegotiation, "slds-is-incomplete");
                    $A.util.addClass(liClose, "slds-is-incomplete");
                    $A.util.removeClass(liGatheringNeeds, "slds-is-active");
                    $A.util.removeClass(liVerbalInterest, "slds-is-complete");
                    $A.util.removeClass(liSentProposal, "slds-is-complete");
                    $A.util.removeClass(liNegotiation, "slds-is-complete");
                    $A.util.removeClass(liClose, "slds-is-complete");                    
                    $A.util.removeClass(liClosureStages, "slds-is-current");
                    $A.util.addClass(liClosureStages, "slds-is-incomplete");
                    for(var i=0;i< oppStages.length;i++){
                        var oppClosureStage=document.getElementById(oppStages[i]);
                        $A.util.removeClass(oppClosureStage, "slds-is-active");
                        $A.util.removeClass(oppClosureStage, "slds-is-complete");
                        $A.util.addClass(oppClosureStage, "slds-is-incomplete");
                    }
                }
                break;
            case "Verbal Interest":
                $A.util.removeClass(liGatheringNeeds, "slds-is-active");
                $A.util.removeClass(liProspectingOptions, "slds-is-active");
                $A.util.addClass(liVerbalInterest, "slds-is-active");
                $A.util.removeClass(liSentProposal, "slds-is-active");
                $A.util.removeClass(liNegotiation, "slds-is-active");
                $A.util.removeClass(liClose, "slds-is-active");
                $A.util.removeClass(liClosureStages, "slds-is-active");
                for(var i=0;i< oppStages.length;i++){
                    var oppClosureStage=document.getElementById(oppStages[i]);
                    $A.util.removeClass(oppClosureStage, "slds-is-active");
                }
                if (opportunityStage =="Verbal Interest")
                {
                    $A.util.removeClass(liVerbalInterest, "slds-is-complete");
                    $A.util.addClass(liGatheringNeeds, "slds-is-complete");
                    $A.util.addClass(liProspectingOptions, "slds-is-complete");
                    $A.util.addClass(liVerbalInterest, "slds-is-current");
                    $A.util.addClass(liSentProposal, " slds-is-incomplete");
                    $A.util.addClass(liNegotiation, " slds-is-incomplete");
                    $A.util.addClass(liClose, "slds-is-incomplete");
                    $A.util.removeClass(liGatheringNeeds, "slds-is-active");
                    $A.util.removeClass(liProspectingOptions, "slds-is-active");
                    $A.util.removeClass(liNegotiation, "slds-is-complete");
                    $A.util.removeClass(liSentProposal, "slds-is-complete");
                    $A.util.removeClass(liClose, "slds-is-complete");                    
                    $A.util.removeClass(liClosureStages, "slds-is-current");
                    $A.util.addClass(liClosureStages, "slds-is-incomplete");
                    for(var i=0;i< oppStages.length;i++){
                        var oppClosureStage=document.getElementById(oppStages[i]);
                        $A.util.removeClass(oppClosureStage, "slds-is-active");
                        $A.util.removeClass(oppClosureStage, "slds-is-complete");
                        $A.util.addClass(oppClosureStage, "slds-is-incomplete");
                    }
                }
                break;
            case "Sent Proposal":
                $A.util.removeClass(liGatheringNeeds, "slds-is-active");
                $A.util.removeClass(liProspectingOptions, "slds-is-active");
                $A.util.removeClass(liVerbalInterest, "slds-is-active");
                $A.util.addClass(liSentProposal, "slds-is-active");
                $A.util.removeClass(liNegotiation, "slds-is-active");
                $A.util.removeClass(liClose, "slds-is-active");
                $A.util.removeClass(liClosureStages, "slds-is-active");
                for (var i = 0; i < oppStages.length; i++) {
                    var oppClosureStage = document.getElementById(oppStages[i]);
                    $A.util.removeClass(oppClosureStage, "slds-is-active");
                }
                if (opportunityStage == "Sent Proposal") {
                    $A.util.removeClass(liSentProposal, "slds-is-complete");
                    $A.util.addClass(liGatheringNeeds, "slds-is-complete");
                    $A.util.addClass(liProspectingOptions, "slds-is-complete");
                    $A.util.addClass(liVerbalInterest, "slds-is-complete");
                    $A.util.addClass(liSentProposal, "slds-is-current");                    
                    $A.util.addClass(liNegotiation, " slds-is-incomplete");
                    $A.util.addClass(liClose, "slds-is-incomplete");
                    $A.util.removeClass(liGatheringNeeds, "slds-is-active");
                    $A.util.removeClass(liProspectingOptions, "slds-is-active");
                    $A.util.removeClass(liNegotiation, "slds-is-complete");     
                    $A.util.removeClass(liClose, "slds-is-complete");
                    $A.util.removeClass(liClosureStages, "slds-is-current");
                    $A.util.addClass(liClosureStages, "slds-is-incomplete");
                    for (var i = 0; i < oppStages.length; i++) {
                        var oppClosureStage = document.getElementById(oppStages[i]);
                        $A.util.removeClass(oppClosureStage, "slds-is-active");
                        $A.util.removeClass(oppClosureStage, "slds-is-complete");
                        $A.util.addClass(oppClosureStage, "slds-is-incomplete");
                    }
                }
                break;
            case "Negotiation":
                $A.util.removeClass(liGatheringNeeds, "slds-is-active");
                $A.util.removeClass(liProspectingOptions, "slds-is-active");
                $A.util.removeClass(liVerbalInterest, "slds-is-active");
                $A.util.removeClass(liSentProposal, "slds-is-active");
                $A.util.addClass(liNegotiation, "slds-is-active");
                $A.util.removeClass(liClose, "slds-is-active");
                $A.util.removeClass(liClosureStages, "slds-is-active");
                for(var i=0;i< oppStages.length;i++){
                    var oppClosureStage=document.getElementById(oppStages[i]);
                    $A.util.removeClass(oppClosureStage, "slds-is-active");
                }
                if (opportunityStage =="Negotiation")
                {
                    $A.util.addClass(liGatheringNeeds, "slds-is-complete");
                    $A.util.addClass(liProspectingOptions, "slds-is-complete");
                    $A.util.addClass(liVerbalInterest, "slds-is-complete");
                    $A.util.addClass(liSentProposal, "slds-is-complete");
                    $A.util.addClass(liNegotiation, "slds-is-current");
                    $A.util.addClass(liClose, "slds-is-incomplete");
                    $A.util.removeClass(liGatheringNeeds, "slds-is-active");
                    $A.util.removeClass(liProspectingOptions, "slds-is-active");
                    $A.util.removeClass(liSentProposal, "slds-is-active");
                    $A.util.removeClass(liVerbalInterest, "slds-is-active");
                    $A.util.removeClass(liNegotiation, "slds-is-complete");
                    $A.util.removeClass(liClose, "slds-is-complete");                    
                    $A.util.removeClass(liClosureStages, "slds-is-current");
                    $A.util.addClass(liClosureStages, "slds-is-incomplete");
                    for(var i=0;i< oppStages.length;i++){
                        var oppClosureStage=document.getElementById(oppStages[i]);
                        $A.util.removeClass(oppClosureStage, "slds-is-active");
                        $A.util.removeClass(oppClosureStage, "slds-is-complete");
                        $A.util.addClass(oppClosureStage, "slds-is-incomplete");
                    }
                }
                break;
            case "Awaiting Closure":
                {
                    $A.util.removeClass(liGatheringNeeds, "slds-is-active");
                    $A.util.removeClass(liProspectingOptions, "slds-is-active");
                    $A.util.removeClass(liVerbalInterest, "slds-is-active");
                    $A.util.removeClass(liSentProposal, "slds-is-active");
                    $A.util.removeClass(liClose, "slds-is-active");
                    $A.util.removeClass(liNegotiation, "slds-is-active");
                    
                    $A.util.addClass(liClosureStages, "slds-is-active");
                    $A.util.addClass(liGatheringNeeds, "slds-is-complete");
                    $A.util.addClass(liProspectingOptions, "slds-is-complete");
                    $A.util.addClass(liVerbalInterest, "slds-is-complete");
                    $A.util.addClass(liSentProposal, "slds-is-complete");
                    $A.util.addClass(liNegotiation, "slds-is-complete");
                    $A.util.addClass(liClose, "slds-is-incomplete");
                    break;
                }
            case "Close":
                $A.util.removeClass(liGatheringNeeds, "slds-is-active");
                $A.util.removeClass(liProspectingOptions, "slds-is-active");
                $A.util.removeClass(liVerbalInterest, "slds-is-active");
                $A.util.removeClass(liSentProposal, "slds-is-active");
                $A.util.removeClass(liNegotiation, "slds-is-active");
                $A.util.addClass(liClose, "slds-is-active");
                $A.util.removeClass(liClosureStages, "slds-is-active");
                for(var i=0;i< oppStages.length;i++){
                    var oppClosureStage=document.getElementById(oppStages[i]);
                    $A.util.removeClass(oppClosureStage, "slds-is-active");
                }
                if(opportunityStage=="Close")
                {
                    $A.util.removeClass(liClose, "slds-is-complete");
                    $A.util.addClass(liGatheringNeeds, "slds-is-complete");
                    $A.util.addClass(liProspectingOptions, "slds-is-complete");
                    $A.util.addClass(liVerbalInterest, "slds-is-complete");
                    $A.util.addClass(liSentProposal, "slds-is-complete");
                    $A.util.addClass(liNegotiation, "slds-is-complete");
                    $A.util.addClass(liClose, "slds-is-current");
                }
                break;
            case "Closed Lost":
                {
                    var oppLength=oppStages.length-3;
                    $A.util.removeClass(liGatheringNeeds, "slds-is-active");
                    $A.util.removeClass(liProspectingOptions, "slds-is-active");
                    $A.util.removeClass(liVerbalInterest, "slds-is-active");
                    $A.util.removeClass(liSentProposal, "slds-is-active");
                    $A.util.removeClass(liNegotiation, "slds-is-active");
                    $A.util.removeClass(liClose, "slds-is-active");
                    $A.util.addClass(liClose, "slds-hide");
                    $A.util.removeClass(liClosureStages, "slds-is-current slds-is-active");
                    $A.util.addClass(liClosureStages, "slds-is-incomplete");
                    for(var i=0;i< oppLength;i++){
                        var oppClosureStage=document.getElementById(oppStages[i]);
                        $A.util.removeClass(oppClosureStage, "slds-is-complete");
                        $A.util.removeClass(oppClosureStage, "slds-is-active");
                        $A.util.addClass(oppClosureStage, "slds-is-incomplete");
                    }
                    if(opportunityStage=="Closed Lost")
                    {
                        $A.util.removeClass(liGatheringNeeds, "slds-is-complete");
                        $A.util.removeClass(liProspectingOptions, "slds-is-complete");
                        $A.util.removeClass(liVerbalInterest, "slds-is-complete");
                        $A.util.removeClass(liSentProposal, "slds-is-complete");
                        $A.util.removeClass(liNegotiation, "slds-is-complete");
                        $A.util.removeClass(liClose, "slds-is-complete");
                        $A.util.addClass(liGatheringNeeds, "slds-is-incomplete");
                        $A.util.addClass(liProspectingOptions, "slds-is-incomplete");
                        $A.util.addClass(liVerbalInterest, "slds-is-incomplete");
                        $A.util.addClass(liSentProposal, "slds-is-incomplete");
                        $A.util.addClass(liNegotiation, "slds-is-incomplete");
                        $A.util.addClass(liCloseLost, "slds-is-lost");
                    }
                    break;
                }
            case "Closed Won":
                {
                    var oppLength=oppStages.length-3;
                    $A.util.removeClass(liGatheringNeeds, "slds-is-active");
                    $A.util.removeClass(liProspectingOptions, "slds-is-active");
                    $A.util.removeClass(liVerbalInterest, "slds-is-active");
                    $A.util.removeClass(liSentProposal, "slds-is-active");
                    $A.util.removeClass(liNegotiation, "slds-is-active");
                    $A.util.removeClass(liClose, "slds-is-active");
                    $A.util.addClass(liClose, "slds-hide");
                    $A.util.removeClass(liCloseWon, "slds-hide");
                    $A.util.removeClass(liClosureStages, "slds-is-current slds-is-active");
                    $A.util.addClass(liClosureStages, "slds-is-complete");
                    for(var i=0;i< oppLength;i++){
                        var oppClosureStage=document.getElementById(oppStages[i]);
                        $A.util.removeClass(oppClosureStage, "slds-is-active");
                        $A.util.addClass(oppClosureStage, "slds-is-complete");
                    }
                    if(opportunityStage=="Closed Won")
                    {
                        $A.util.addClass(liGatheringNeeds, "slds-is-complete");
                        $A.util.addClass(liProspectingOptions, "slds-is-complete");
                        $A.util.addClass(liVerbalInterest, "slds-is-complete");
                        $A.util.addClass(liSentProposal, "slds-is-complete");
                        $A.util.addClass(liNegotiation, "slds-is-complete");
                        $A.util.addClass(liClose, "slds-is-complete");
                        $A.util.addClass(liCloseWon, "slds-is-won");
                    }
                    break;
                }
            default:
                {
                    var oppLength=oppStages.length-3;
                    for(var i=0;i<oppLength;i++){
                        var stageName=oppStages[i];
                        var oppClosureStage=document.getElementById(stageName);
                        //$A.util.removeClass(oppClosureStage, "slds-is-active");
                        //$A.util.removeClass(liClosureStages, "slds-is-active");
                        if(stageName==stepName){
                            $A.util.addClass(oppClosureStage, "slds-is-active");
                            if(i==(oppLength-1)){
                                $A.util.addClass(liClosureStages, "slds-is-active");
                            }
                        }
                        else{
                            $A.util.removeClass(oppClosureStage, "slds-is-active");
                            $A.util.removeClass(liGatheringNeeds, "slds-is-active");
                            $A.util.removeClass(liProspectingOptions, "slds-is-active");
                            $A.util.removeClass(liVerbalInterest, "slds-is-active");
                            $A.util.removeClass(liSentProposal, "slds-is-active");
                            $A.util.removeClass(liNegotiation, "slds-is-active");
                            $A.util.removeClass(liClose, "slds-is-active");
                            $A.util.removeClass(liClosureStages, "slds-is-active");
                        }
                    } 
                    break;
                }
        }
    }
})