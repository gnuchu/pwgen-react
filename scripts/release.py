#!/usr/bin/env python3

import os
import pathlib
import sys
from zipfile import ZipFile

def main(release_number):
    project_root = pathlib.Path.cwd()
    build_directory = "build"
    release_directory = os.path.join(project_root, "releases")
    release_name = f"pwgen_react_{release_number}.zip"
    release = os.path.join(release_directory, release_name)

    try:
        with ZipFile(release, "w") as zip_object:
            for (dirPath, dirName, fileNames) in os.walk(build_directory):
                for fileName in fileNames:
                    file = os.path.join(dirPath, fileName)
                    zip_object.write(file)
        
    except Exception as e:
        raise(e)

if __name__ == "__main__":
    release_number = sys.argv[1]
    main(release_number)