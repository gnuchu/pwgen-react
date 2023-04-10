#!/usr/bin/env python3

import os
import pathlib
import sys
from zipfile import ZipFile
import json

def main(release_number):
    project_root = pathlib.Path.cwd()
    build_directory = "build"
    release_directory = os.path.join(project_root, "releases")
    
    try:
        token = os.environ['GITHUB_TOKEN']
    except:
        raise("Github token not available")
    

    version = f"v1.0.{release_number}"
    release_name = f"pwgen_react_web{version}.zip"
    release = os.path.join(release_directory, release_name)

    try:
        with ZipFile(release, "w") as zip_object:
            for (dirPath, dirName, fileNames) in os.walk(build_directory):
                for fileName in fileNames:
                    file = os.path.join(dirPath, fileName)
                    zip_object.write(file)
        
    except Exception as e:
        raise(e)
    
    command = "gh api "
    command += "--method POST "
    command += "-H \"Accept: application/vnd.github+json\" "
    command += "/repos/gnuchu/pwgen-react/releases "
    command += f"-f tag_name='{version}' "
    command += f"-f name='{version}' "
    command += "-F draft=false "
    command += "-F prerelease=false "
    command += "-F generate_release_notes=false "

    try:
        result = os.popen(command).read()
        release_info = json.loads(result)
    except Exception as e:
        raise(e)

    release_id = release_info['id']

    command = ""
    command += "curl "
    command += "-X POST "
    command += "-H \"Accept: application/vnd.github+json\" "
    command += f"-H \"Authorization: Bearer {token}\" "
    command += "-H \"X-GitHub-Api-Version: 2022-11-28\" "
    command += "-H \"Content-Type: application/octet-stream\" "
    command += f"https://uploads.github.com/repos/gnuchu/pwgen-react/releases/{release_id}/assets?name={release_name} "
    command += f"--data-binary \"@releases/{release_name}\""
    
    try:
        result = os.popen(command).read()
        print(result)
    except Exception as e:
        raise(e)

if __name__ == "__main__":
    release_number = sys.argv[1]
    main(release_number)