#!/usr/bin/env python3

import os
import pathlib
import sys
from zipfile import ZipFile

def main():
    where_I_am = pathlib.Path.cwd()
    project_root = os.path.join(where_I_am, "..")
    build_directory = os.path.join(project_root, "build")
    print(build_directory)


if __name__ == "__main__":
    print(sys.argv)
    main()