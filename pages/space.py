import os

def find_largest_smallest_files(root_dir, top_n=5):
    """
    Walks through a directory and finds the largest and smallest files.
    
    :param root_dir: The root directory to start scanning
    :param top_n: How many largest and smallest files to display
    """
    file_sizes = []

    # Walk through the directory tree
    for dirpath, _, filenames in os.walk(root_dir):
        for f in filenames:
            try:
                file_path = os.path.join(dirpath, f)
                size = os.path.getsize(file_path)
                file_sizes.append((file_path, size))
            except (OSError, PermissionError):
                # Skip files we can't access
                continue

    if not file_sizes:
        print("No files found in the given directory.")
        return

    # Sort by size
    file_sizes.sort(key=lambda x: x[1])

    print(f"\n📂 Scanned: {root_dir}")
    print(f"📊 Total files: {len(file_sizes)}")

    print("\n🔽 Smallest files:")
    for f, size in file_sizes[:top_n]:
        print(f"  {f} — {size} bytes")

    print("\n🔼 Largest files:")
    for f, size in file_sizes[-top_n:]:
        print(f"  {f} — {size} bytes")


# Example usage:
if __name__ == "__main__":
    directory_to_scan = "/Users/mac/Downloads/Ecommerce-project/ecommerce-project"  # change this to your directory path
    find_largest_smallest_files(directory_to_scan, top_n=5)
