import { util } from "vortex-api";
import { ID } from "./main";

type Props = { gameStoreHelper: typeof util.GameStoreHelper };

export class InstallerRegistration {
  private gameStoreHelper: any;

  constructor(props: Props) {
    this.gameStoreHelper = props.gameStoreHelper;
  }

  create() {
    return [
      `${ID}-PAK`,
      25,
      true,
      [
        {
          type: "copy",
          source: "source_path",
          destination: "destination",
        },
      ],
    ];
  }
}
