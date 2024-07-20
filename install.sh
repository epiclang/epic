#!/bin/sh
# Copyright 2024 the Epic authors. All rights reserved. MIT license.

set -e

if ! command -v unzip >/dev/null && ! command -v 7z >/dev/null; then
	echo "Error: either unzip or 7z is required to install Epic (see: https://github.com/epiclang/epic#installation )." 1>&2
	exit 1
fi

if [ "$OS" = "Windows_NT" ]; then
	target="x86_64-pc-windows-msvc"
else
	case $(uname -sm) in
	"Darwin x86_64") target="x86_64-apple-darwin" ;;
	"Darwin arm64") target="aarch64-apple-darwin" ;;
	"Linux aarch64") target="aarch64-unknown-linux-gnu" ;;
	*) target="x86_64-unknown-linux-gnu" ;;
	esac
fi

echo $target
if [ $# -eq 0 ]; then
	epic_uri="https://github.com/epiclang/epic/releases/latest/download/epic-${target}.zip"
else
	epic_uri="https://github.com/epiclang/epic/releases/download/${1}/epic-${target}.zip"
fi

epic_install="${EPIC_INSTALL:-$HOME/.epic}"
bin_dir="$epic_install/bin"
exe="$bin_dir/epic"

if [ ! -d "$bin_dir" ]; then
	mkdir -p "$bin_dir"
fi

curl --fail --location --progress-bar --output "$exe.zip" "$epic_uri"
if command -v unzip >/dev/null; then
	unzip -d "$bin_dir" -o "$exe.zip"
else
	7z x -o"$bin_dir" -y "$exe.zip"
fi

# Find the extracted executable and move it to the correct location
find "$bin_dir" -name "epic-*" -type f -exec mv {} "$exe" \;

if [ ! -f "$exe" ]; then
    echo "Error: Could not find the epic executable after extraction." 1>&2
    exit 1
fi

chmod +x "$exe"
rm "$exe.zip"

echo "Epic was installed successfully to $exe"
if command -v epic >/dev/null; then
	echo "Run 'epic --help' to get started"
else
	case $SHELL in
	/bin/zsh) shell_profile=".zshrc" ;;
	*) shell_profile=".bashrc" ;;
	esac
	echo "Manually add the directory to your \$HOME/$shell_profile (or similar)"
	echo "  export EPIC_INSTALL=\"$epic_install\""
	echo "  export PATH=\"\$EPIC_INSTALL/bin:\$PATH\""
	echo "Run '$exe --help' to get started"
fi
echo
echo "Stuck? Visit our GitHub repository: https://github.com/epiclang/epic"