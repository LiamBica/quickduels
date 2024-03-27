import { Params } from "types/bot";
import { Command } from "@/structures";
import { useReplacer } from "@/functions/replacer";
import AWS from 'aws-sdk';

export default class StartServer extends Command {
  name = "startserver";
  description =
    "Start a CS2 Server - FOR TESTING ONLY";
  aliases = ["start"];
  usage = "startserver";
  requiredPerms = ["administrator"];

  async execute(ctx: Params) {

      const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
      AWS.config.credentials = credentials;
      AWS.config.region = "eu-central-1";

      const ecs = new AWS.ECS();

      const params = {
        cluster: 'csgo-server-eu',
        taskDefinition: 'arn:aws:ecs:eu-central-1:108328537053:task-definition/quickduels-server:3',
        count: 1, // Number of tasks to run
        launchType: 'FARGATE',
        networkConfiguration: {
          awsvpcConfiguration: {
            subnets: ['subnet-7dff4b01'],
            assignPublicIp: 'ENABLED'
          }
        }
      };

      ecs.runTask(params, (err, data) => {
        if (err) {
          return 'Failed to execute task on Fargate';
        } else {
          return 'Task started successfully:';
        }
      });

  }
}
