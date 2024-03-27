import { Command } from "@/structures";
import { channel } from "diagnostics_channel";
import { Params } from "types/bot";
import { Player } from "types/player";

export default class Search extends Command {
    name = "search";
    description = "Start searching";
    aliases = ["search"];
    usage = "search";
    

    execute(ctx: Params) {
        const memberHasRoles = ctx.bot.settings.successRoles.every((roleId) =>{
            ctx.author.roles.includes(roleId);
        });

        const isSearching = ctx.bot.master.matchmakingPool.some((player => player.hasOwnProperty(ctx.author.id)));

        const memberSteamId: string = ctx.bot.master.usedAccounts.find(account => 
            account.includes(ctx.author.id)).split("/")[0];
       
       const playerToAdd: Player = {
        [ctx.author.id]:{
            steamId: memberSteamId
        }}
     
        if (!isSearching){
            ctx.bot.master.matchmakingPool.push(playerToAdd)
            console.log(memberSteamId + " added to pool")
            ctx.message.addReaction("✅")
            ctx.author.addRole("1222346226997923880");
        }else{
            ctx.message.addReaction("🔍")
        }
      
    }
    
}