{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "Asterisk Website Development Environment";

  # https://devenv.sh/packages/
  packages = [
    pkgs.gh # GitHub CLI
    pkgs.gitui # Terminal UI for Git
  ];

  # https://devenv.sh/languages/
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_22; # Node.js 22 LTS
    npm = {
      enable = true;
      install.enable = false;
    };
  };

  languages.typescript = {
    enable = true;
  };

  # https://devenv.sh/scripts/
  scripts.hello.exec = ''
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🌟 Welcome to $GREET"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📦 Environment:"
    echo "  Node.js: $(node --version)"
    echo "  npm:     $(npm --version)"
    echo "  TypeScript: $(npx tsc --version)"
    echo ""
  '';

  scripts.dev.exec = ''
    echo "🚀 Starting Next.js development server with Turbopack..."
    npm run dev
  '';

  scripts.build.exec = ''
    echo "🏗️  Building production bundle..."
    npm run build
  '';

  scripts.lint.exec = ''
    echo "🔍 Running Biome linter..."
    npm run lint
  '';

  scripts.format.exec = ''
    echo "✨ Formatting code with Biome..."
    npm run format
  '';

  scripts.type-check.exec = ''
    echo "🔎 Running TypeScript type checking..."
    npm run type-check
  '';

  enterShell = ''
    hello
    echo "📚 Documentation:"
    echo "  Project docs:  .claude/claude.md"
    echo "  Commit SOP:    .claude/docs/SOPs/commit-and-release-standards.md"
    echo ""
    echo "🔧 Available commands:"
    echo "  dev         - Start Next.js dev server with Turbopack"
    echo "  build       - Build production bundle"
    echo "  lint        - Run Biome linter"
    echo "  format      - Format code with Biome"
    echo "  type-check  - Run TypeScript type checking"
    echo "  gitui       - Open Git terminal UI"
    echo ""
    echo "🚨 IMPORTANT: Read .claude/docs/SOPs/commit-and-release-standards.md before committing!"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  '';

  # https://devenv.sh/processes/
  # Uncomment to auto-start dev server when entering shell
  # processes.dev.exec = "npm run dev";

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/environment-variables/
  env.NODE_ENV = lib.mkDefault "development";
  env.NEXT_TELEMETRY_DISABLED = "1";

  # See full reference at https://devenv.sh/reference/options/
}
