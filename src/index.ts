import { Master } from "@/structures";
import Bot from "@/util/bot";
import API from "@/util/api";
import strings from "@/strings";
import { Player } from "types/player";

export default class Main extends Master {
  queue = new Map();
  usedAccounts: string[] = [];
  matchmakingPool: Player[] = [];
  strings = {
    bot: strings.bot,
    api: strings.api,
    web: strings.web,
  };

  bot = new Bot(this);
  api = new API(Number(process.env.API_PORT) || 3000, this);
  constructor() {
    super();
  }
}

new Main();
