# ENS Wayback Machine

ENS Wayback Machine is a Web3 version of the Internet Archive's Wayback Machine that allows users to view historical versions of IPFS content associated with ENS domains. It is built using Ethereum Name Service (ENS) and InterPlanetary File System (IPFS) technologies.

The service is designed to help researchers, historians, and anyone interested in tracking changes to websites over time or retrieving lost content. Users can search for specific ENS domains or URLs and view archived versions of those sites as they appeared on different dates in the past.

Unlike the Wayback Machine maintained by the Internet Archive, the ENS Wayback Machine does not crawl the web or store archived web pages. Instead, it relies on the fact that the IPFS links are stored in the blockchain and can be accessed to view the content associated with a particular domain. This means that the service is only useful for ENS domains that have associated IPFS content.

## Getting Started

To get started with the ENS Wayback Machine, you can visit the [website](https://wayback-machine.eth.limo) and search for an ENS domain or URL. You can navigate to different dates using the top bar and view the archived content as it appeared on that date.

## Development

The ENS Wayback Machine is an open-source project, and contributions are welcome. The code is available on [GitHub](https://github.com/BlossomLabs/wayback-machine), and you can run it locally using the following steps:

1.  Clone the repository: git clone https://github.com/BlossomLabs/wayback-machine.git
2.  Install dependencies: bun install
3.  Start the development server: bun dev

You will need to have [Node v18 or above](https://nodejs.org/) and [Bun](https://bun.sh/) installed on your machine.

## Deployment
To deploy the ENS Wayback Machine, you can follow these steps:

1. Set The `VITE_THEGRAPH_API_KEY` environment variable to your TheGraph API key.
2. If you are interested, set the environment variable `VITE_BANNER_URL` to customize the banner. The URL should reply a text with the format `[message text]|[link text]|[link href]`. If you don't set this variable, no banner will be displayed.
3. Build the project: `bun run build`
4. Deploy the built project to your desired hosting platform.

## License

This project is licensed under the [AGPLv3 License](LICENSE).
